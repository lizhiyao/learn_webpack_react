# Webpack入门

[Webpack入门 demo] (https://github.com/lizhiyao/learn_webpack)

# Webpack引入文件
Webpack 允许你使用不同的模块类型

## ES6 模块

    import MyModule from './MyModule.js';

## CommonJS

    var MyModule = require('./MyModule.js');

## AMD

    define(['./MyModule.js'], function (MyModule) {

    });
    
Webpack 只是一个模块合并！也就是说你可以设置他去加载任何你写的匹配，只要有一个加载器。

# 安装 React JS

    npm install --save react react-dom

# 在代码中使用 ReactJS

component.jsx

    import React from 'react';

    export default class Hello extends React.Component {
      render() {
        return <h1>Hello world</h1>;
      }
    }
    
main.js

    import React from 'react';
    import Hello from './component/hello';

    main();

    function main() {
        React.render(<Hello />, document.getElementById('app'));
    }
    
build/index.html

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
      </head>
      <body>
        <div id="app"></div>

        <script src="http://localhost:8080/webpack-dev-server.js"></script>
        <script src="bundle.js"></script>
      </body>
    </html>

# 转换 JSX
为了能够使用 JSX 语法，需要用 Webpack 来转码你的 JavaScript，
这是加载器的工作，我们可以使用一个很好用也有很多功能的 Babel。

安装babel-loader
    
    npm install --save-dev babel-loader
    npm install --save-dev babel-core
    npm install --save-dev babel-preset-es2015
    npm install --save-dev babel-preset-react
    
或者
 
    npm install --save-dev babel-loader babel-core babel-preset-es2015 babel-preset-react
    
配置webpack.config.js来使用加载器

    var path = require('path');

    module.exports = {
      entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      },
      resolve: {
        // resolve属性中的extensions数组中用于配置程序可以自行补全哪些后缀
        extensions: ['', '.js', '.jsx']
      }
    }

运行 npm run dev，然后刷新页面就可以看到修改

# 准备加载 CSS
Webpack允许像加载任何代码一样加载 CSS。你可以选择你所需要的方式，
但是你可以为每个组件把所有你的 CSS 加载到入口主文件中来做任何事情。

加载 CSS 需要 css-loader 和 style-loader，他们做两件不同的事情，
css-loader会遍历 CSS 文件，然后找到 url() 表达式然后处理他们，
style-loader 会把原来的 CSS 代码插入页面中的一个 style 标签中。

安装这两个加载器：

    npm install css-loader style-loader --save-dev

加载器配置加到 Webpack.config.js 文件中   

    var path = require('path');

    module.exports = {
      entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            loader: 'babel', // 加载模块 "babel" 是 "babel-loader" 的缩写
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          },
          { 
            test: /\.css$/, // Only .css files
            loader: "style!css" // Run both loaders
          }
        ]
      }
    }

# 加载 CSS 文件
加载一个 CSS 文件就和加载其他文件一样简单

main.js

    import './main.css';
    // Other code
    
Component.jsx

    import './Component.css';
    import React from 'react';

    export default React.createClass({
      render: function () {
        return <h1>Hello world!</h1>
      }
    });

# CSS 加载策略
根据你的应用，你可能会考略三种策略。另外，你需要考虑把一些基础的 CSS 内联到初始容器中（index.html）

## 所有合并成一个
在你的主入口文件中个，比如 app/main.js 你可以为整个项目加载所有的 CSS：

app/main.js

    import './project-styles.css';
    // 其他 JS 代码
  
The CSS is included in the application bundle and does not need to download.

## 懒加载

如果你想发挥应用中多重入口文件的优势，你可以在每个入口点包含各自的 CSS：

app/main.js

    import './style.css';
    // 其他 JS 代码
    
app/entryA/main.js

    import './style.css';
    // 其他 JS 代码
    
app/entryB/main.js

    import './style.css';
    // 其他 JS 代码

You divide your modules by folders and include both CSS and JavaScript files in those folders. 
Again, the imported CSS is included in each entry bundle when running in production.

你把你的模块用文件夹分离，每个文件夹有各自的 CSS 和 JavaScript 文件。
再次，当应用发布的时候，导入的 CSS 已经加载到每个入口文件中。

## 具体的组件
你可以根据这个策略为每个组件创建 CSS 文件，可以让组件名和 CSS 中的 class 使用一个命名空间，
来避免一个组件中的一些 class 干扰到另外一些组件的 class。

app/components/MyComponent.css

    .MyComponent-wrapper {
      background-color: #EEE;
    }
    
app/components/MyComponent.jsx

    import './MyComponent.css';
    import React from 'react';

    export default React.createClass({
      render: function () {
        return (
          <div className="MyComponent-wrapper">
            <h1>Hello world</h1>
          </div>
        )
      }
    });

## 使用内联样式取代 CSS 文件
在 “React Native” 中你不再需要使用任何 CSS 文件，你只需要使用 style 属性，可以把你的 CSS 定义成一个对象，那样就可以根据你的项目重新来考略你的 CSS 策略。

app/components/MyComponent.jsx

    import React from 'react';

    var style = {
      backgroundColor: '#EEE'
    };

    export default React.createClass({
      render: function () {
        return (
          <div style={style}>
            <h1>Hello world</h1>
          </div>
        )
      }
    });

# react-router






# redux





# 参考

[React 和 Webpack 小书] (https://hainuo.gitbooks.io/react-webpack-cookbook/content/index.html)