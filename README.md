# jest-json-to-tap
Jest Json parser that outputs [TAP](https://testanything.org/tap-specification.html) results

## Usage
Install *jest-json-to-tap*

```
npm install -g jest-json-to-tap
```

then you just need to redirect Jest's json output to it

```
$ jest --json 2>/dev/null | jest-jsont-to-tap
```

Beware in the command above we muted stderr to remove all extra msgs that jest outputs on stderr.

## Acknowledgement
Based on the solution proposed by [Edvin Erikson](https://medium.com/@edvinerikson?source=post_header_lockup) at https://medium.com/@edvinerikson/getting-jest-output-in-tap-format-6e07dc2c484c