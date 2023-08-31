import sys
import json
import random

fighters = json.loads(sys.argv[1])

def prediction (fighters):
    random_number = random.randint(1,2)
    if random_number == 1 : winner = fighters["fighter1"]
    if random_number == 2 : winner = fighters["fighter2"]
    print(f'{winner["firstName"]} {winner["lastName"]}')

if sys.argv[2] == 'predict' : prediction(fighters)

sys.stdout.flush()