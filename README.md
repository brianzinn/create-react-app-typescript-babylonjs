Lots of projects are being discontinued in favour of Create React App.  ie:
https://github.com/davezuko/react-redux-starter-kit (10K stars)
https://github.com/rangle/typescript-react-redux-example

So, wanted to create a BabylonJS starter kit with redux-saga to provide a possible starting point for anybody interested.  I wanted this starter to be Typescript, so used react-scripts-ts:

```csh
npm install -g create-react-app

create-react-app my-app --scripts-version=react-scripts-ts
```

If you clone this repo you just need to do
```csh
yarn install
```
or
```csh
npm install
```

This project has added babylonjs-react (NPM) and redux.

What I intend to add/fix soon:
<ol>
<li>fix the TODO with basic functionality.</li>
<li>fix babylonJS scene for home page to use babylonjs-react middleware - possibly new VR helper!</li>
<li>add proper HMR - seems to refresh entire page</li>
<li>add gh-pages</li>
</ol>