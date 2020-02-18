import shlex
import sys

def note_main(length, tempo, body):
    print(length)
    print(tempo)
    print(body)

if len(sys.argv) != 2:
    print('Please specify one filename on the command line.')
    sys.exit(1)

filename = sys.argv[1]

with open(filename, "r") as fd:
    body = fd.read()

'''
print('ORIGINAL:', repr(body))
print()
print('TOKENS:')
'''

tokens = shlex.shlex(body)

'''
for token in tokens:
    print(repr(token))
'''

token = tokens.get_token()

if token == 'main':
    t = tokens.get_token()
    if t != 'stream':
        print('stream expected, got {}'.format(t))
        sys.exit(-1)

    t = tokens.get_token()
    if t != '(':
        print('( expected, got {}'.format(t))
        sys.exit(-1)

    length = tokens.get_token()

    t = tokens.get_token()
    if t != ',':
        print(', expected, got {}'.format(t))
        sys.exit(-1)

    tempo = tokens.get_token()

    t = tokens.get_token()
    if t != ')':
        print(') expected, got {}'.format(t))
        sys.exit(-1)

    t = tokens.get_token()
    if t != '{':
        print('{ expected, got {}'.format(t))
        sys.exit(-1)

    body = []
    t = tokens.get_token()
    while t != '' and t != '}':
        body.append(t)
        t = tokens.get_token()

    if t != '}':
        print('} expected, got {}'.format(t))
        sys.exit(-1)

    note_main(length, tempo, body)



