# goplayground-js

* The Go Playground API client for Browsers / Node.js
* Command line tool for Node.js is also available.

## Usage

### For Browsers

```console
$ npm install --save @syumai/goplayground
```

```ts
import { GoPlayground } from "@syumai/goplayground"

const gp = new GoPlayground();
const result = await gp.format(src);
```

### For Node.js

```console
$ npm install --save @syumai/goplayground-node
```

```ts
import { GoPlayground } from "@syumai/goplayground-node/playground"

const gp = new GoPlayground();
const result = await gp.format(src);
```

## Use `goplayground-node` as a CLI tool

### Installation

```console
$ npm install -g @syumai/goplayground-node
```

### Usage

```console
goplayground-node fmt example.go   # format src
goplayground-node run example.go   # run src
goplayground-node share example.go # publish src
```

## Prior works

* Implementation in Go: https://github.com/tenntenn/goplayground

## License

MIT

## Author

syumai
