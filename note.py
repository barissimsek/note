import shlex
import sys

if len(sys.argv) != 2:
    print('Please specify one filename on the command line.')
    sys.exit(1)

filename = sys.argv[1]

with open(filename, "r") as fd:
    body = fd.read()

print('ORIGINAL:', repr(body))
print()

print('TOKENS:')
tokens = shlex.shlex(body)
for token in tokens:
    print(repr(token))