Lots of projects are being discontinued in favour of Create React App.  ie:
<ul>
<li>https://github.com/davezuko/react-redux-starter-kit (~10K ★'s)</li>
<li>https://github.com/rangle/typescript-react-redux-example</li>
</ul>

So, wanted to create a BabylonJS starter kit with React + Redux (saga) to provide a possible starting point for anybody interested.  I wanted this starter to be Typescript, so used react-scripts-ts:

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

This project has not been 'ejected', so that decision has not already been made for you!

This project uses babylonjs-react [NPM](https://www.npmjs.com/package/react-babylonjs), but not linked to 'redux-saga' yet.  Additionally, GUI and Physics Engine have been ES6 imported, which is new in BabylonJS 3.1.0-alpha3.4+ :)

What I intend to add/fix:
<ol>
<li>fix babylonJS scene to use babylonjs-react middleware via saga</li>
<li>add new VR helper</li>
<li>add proper HMR - seems to refresh entire page</li>
<li>connect ToDo to Azure functions (and possibly even BabylonJS).</li>
</ol>

View result: [demo site on gh-pages](https://brianzinn.github.io/create-react-app-typescript-babylonjs/)