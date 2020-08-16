# goplayground-js

* The Go Playground API client for Browsers / Node.js
* Command line tool for Node.js is also available.

## Installation

### For Browsers

```console
$ npm install --save @syumai/goplayground
```

### For Node.js

```console
$ npm install --save @syumai/goplayground-node
```

## Usage

```ts
import { GoPlayground } from "@syumai/goplayground";

const src = `package main
func main() {}`

const gp = new GoPlayground();

// format src
await gp.format(src);
// run src
await gp.compile(src);
// publish src
await gp.share(src);
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
