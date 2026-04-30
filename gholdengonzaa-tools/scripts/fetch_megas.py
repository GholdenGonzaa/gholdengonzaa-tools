import json
import re
import urllib.request
import time

def main():
    data_path = 'js/data.js'
    with open(data_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to parse the POKEMON_DATA array.
    # It's a JS array of objects.
    match = re.search(r'const POKEMON_DATA = (\[.*?\]);', content, re.DOTALL)
    if not match:
        print("Could not find POKEMON_DATA")
        return
        
    # Dirty parse JS to JSON
    js_array = match.group(1)
    # Fix unquoted keys
    js_array = re.sub(r'(\s+)([a-zA-Z0-9_]+):', r'\1"\2":', js_array)
    # Fix trailing commas
    js_array = re.sub(r',\s*}', '}', js_array)
    js_array = re.sub(r',\s*]', ']', js_array)
    
    try:
        pokemon_list = json.loads(js_array)
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return

    new_pokemon_list = []
    
    # Track existing names to avoid duplicates
    existing_names = set(p['name'] for p in pokemon_list)

    for p in pokemon_list:
        new_pokemon_list.append(p)
        if p.get('mega'):
            # Fetch mega info from pokeapi
            species_url = f"https://pokeapi.co/api/v2/pokemon-species/{p['id']}/"
            try:
                print(f"Fetching species for {p['name']}...")
                req = urllib.request.Request(species_url, headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(req) as response:
                    species_data = json.loads(response.read().decode())
                
                # Find mega varieties
                for var in species_data.get('varieties', []):
                    var_name = var['pokemon']['name']
                    if '-mega' in var_name:
                        # Sometimes there is '-mega-x' and '-mega-y'
                        # Fetch the variety details
                        var_url = var['pokemon']['url']
                        print(f"  Fetching mega details: {var_name}")
                        req = urllib.request.Request(var_url, headers={'User-Agent': 'Mozilla/5.0'})
                        with urllib.request.urlopen(req) as var_resp:
                            var_data = json.loads(var_resp.read().decode())
                        
                        mega_id = var_data['id']
                        mega_types = [t['type']['name'] for t in var_data['types']]
                        speed = next((s['base_stat'] for s in var_data['stats'] if s['stat']['name'] == 'speed'), p['speed'])
                        
                        display_name = "Mega " + p['name']
                        if '-x' in var_name:
                            display_name += " X"
                        elif '-y' in var_name:
                            display_name += " Y"
                            
                        # Ensure we don't add duplicates if already there
                        if display_name not in existing_names:
                            mega_entry = {
                                "id": mega_id,
                                "name": var_name,
                                "displayName": display_name,
                                "types": mega_types,
                                "isMegaVariant": True,
                                "speed": speed
                            }
                            new_pokemon_list.append(mega_entry)
                            existing_names.add(display_name)
                            
                time.sleep(0.5) # rate limit
            except Exception as e:
                print(f"Failed to fetch mega for {p['name']}: {e}")

    # Remove the generic 'mega: true' flag from the base so the frontend doesn't rely on it for display
    # actually let's keep it so the filter works, but we add a 'hasMega' flag or something.
    for p in new_pokemon_list:
        if p.get('mega'):
            p['hasMega'] = True
            # keep mega: true for backward compatibility or change it
            
    # Format back to JS
    new_js_array = json.dumps(new_pokemon_list, indent=2)
    # remove quotes from keys to match original format loosely
    new_js_array = re.sub(r'"([a-zA-Z0-9_]+)":', r'\1:', new_js_array)
    
    new_content = content[:match.start()] + f'const POKEMON_DATA = {new_js_array};' + content[match.end():]
    
    with open(data_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print(f"Successfully added Megas. Total pokemon: {len(new_pokemon_list)}")

if __name__ == '__main__':
    main()
