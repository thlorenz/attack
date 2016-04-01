# attack [![build status](https://secure.travis-ci.org/thlorenz/attack.png)](http://travis-ci.org/thlorenz/attack)

Tool that surfaces problems in your application that render it insecure or may cause it to crash.


```js
// create sitemap of your server
var attack = require('@thlorenz/attack')
var app = require('express')()
  .get('/', function index () { })
  .post('/other', function other () { })

attack.writeRoutes(app)
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Status](#status)
- [Installation](#installation)
- [API](#api)
    - [attack::ab(root, routes, opts)](#attackabroot-routes-opts)
    - [attack::siege(root, routes, opts)](#attacksiegeroot-routes-opts)
    - [attack::writeRoutes(app, opts)](#attackwriteroutesapp-opts)
- [Examples](#examples)
  - [Express Example](#express-example)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Status

Only express apps supported at the moment to have sitemap geneated.

## Installation

    npm install @thlorenz/attack

## API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="attack::ab"><span class="type-signature"></span>attack::ab<span class="signature">(root, routes, <span class="optional">opts</span>)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Generates a shell script that runs various <strong>ab</strong> commands in order to expose
ways that an application could be crashed.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>root</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>root url of the server to attack, i.e. http://localhost:3000</p></td>
</tr>
<tr>
<td class="name"><code>routes</code></td>
<td class="type">
<span class="param-type">Array.&lt;Object></span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>collected via @see ./lib/write-routes.js</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>options to tweak each attack</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>invalidJson</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>options to tweak the @see ./invalid-json.js attack</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/attack/blob/master/attacks/ab/index.js">attacks/ab/index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/attack/blob/master/attacks/ab/index.js#L21">lineno 21</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="attack::siege"><span class="type-signature"></span>attack::siege<span class="signature">(root, routes, <span class="optional">opts</span>)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Generates a urls file and an rc file for <a href="https://www.joedog.org/siege-manual/">siege</a>
(brew install siege)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>root</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>root url of the server to attack, i.e. http://localhost:3000</p></td>
</tr>
<tr>
<td class="name"><code>routes</code></td>
<td class="type">
<span class="param-type">Array.&lt;Object></span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>collected via @see ./lib/write-routes.js</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>options to tweak each attack</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/attack/blob/master/attacks/siege/index.js">attacks/siege/index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/attack/blob/master/attacks/siege/index.js#L26">lineno 26</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="attack::writeRoutes"><span class="type-signature"></span>attack::writeRoutes<span class="signature">(app, <span class="optional">opts</span>)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Writes the routes found on the given app.</p>
<p><strong>Warning</strong>: this function throws if the app's type cannot be detected
<strong>Warning</strong>: this function synchronously writes the routes to the file system</p>
<p>Therefore please run this only during server initialization <strong>after</strong> all routes were installed</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>app</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
</td>
<td class="description last"><p>the app/server on which the routes are mounted</p></td>
</tr>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>type</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>the type of the server/framework, will be detected if not supplied</p></td>
</tr>
<tr>
<td class="name"><code>file</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>path to JSON file to write routes to, <code>./attack-routes.json</code> if not supplied</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/attack/blob/master/lib/write-routes.js">lib/write-routes.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/attack/blob/master/lib/write-routes.js#L8">lineno 8</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## Examples

Try the examples here as follows:

### Express Example

```
cd examples && npm install
make ab-siege-async
node express-async-error
```

In another terminal

```
sh siege-attack.sh && sh ab-attack.sh
```

Then watch your express app crash after a bit.

## License

MIT
