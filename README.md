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
<a href="https://github.com/thlorenz/attack/blob/master/write-routes.js">write-routes.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/attack/blob/master/write-routes.js#L8">lineno 8</a>
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

## License

MIT
