#### Unofficial [Habitica](http://habitica.com/) desktop app

Unofficial Habitica desktop app for Linux. Built upon the basis provided by [Zach Gawlik's Habitica app for Mac OS X](https://github.com/ZachGawlik/desktop-habitica).

#### Installation

[Download the release](https://github.com/ryanleesipes/desktop-habitica/releases).

Alternatively, you can build it yourself by getting the source, running `npm install && npm run build`

#### Packaging for Debian/Ubuntu

If you are packaging for Ubuntu, make sure to run the following commands:

```
$ npm run build
```

This will generate the necessary executable in: dist/app-linux-x64 - then run:

```
$ npm run deb64
```

The final deb should be found in dist/installers.
