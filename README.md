# goplayground-js

* The Go Playground API client for Browsers / Node.js
* Command line tool for Node.js is also available.

## Installation

### For Browsers

#### With npm

```console
$ npm install --save @syumai/goplayground
```

#### With CDN

```js
import { GoPlayground } from "https://unpkg.com/@syumai/goplayground/index.js";
```

### For Node.js

```console
$ npm install --save @syumai/goplayground-node
```

## Usage

```ts
import { GoPlayground } from "@syumai/goplayground"; // or "@syumai/goplayground-node"

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

## Demo

* https://goplay.syumai.dev
  - A customized version of The Go Playground with rich features.
  - Repo: https://github.com/syumai/go-playground-custom

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
