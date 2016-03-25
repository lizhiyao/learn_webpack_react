# Webpack入门

[Webpack入门 demo] (https://github.com/lizhiyao/learn_webpack)

# npm run build
npm 是一个非常好用的用来编译的指令，通过 npm 你可以不用去担心项目中使用了什么技术，

你只要调用这个指令就可以了，只要你在 package.json 中设置 scripts 的值就可以了。

把编译步骤放到 npm run build 中:

1. 安装webpack
  
    npm i webpack --save-dev

2. 把下面的内容添加到 package.json中。

    "scripts": {
      "build": "webpack"
    }
    
    
# 设置 webpack-dev-server
如果需要一直输入 npm run build 确实是一件非常无聊的事情，

幸运的是，我们可以把让他安静的运行，让我们设置 webpack-dev-server。

1. 安装webpack-dev-server

    npm i webpack-dev-server --save-dev
    
2. 把下面的内容添加到 package.json中。

    {
      "scripts": {
        "build": "webpack",
        "dev": "webpack-dev-server --devtool eval --progress --colors --hot --content-base build"
      }
    }
    
> webpack-dev-server - 在 localhost:8080 建立一个 Web 服务器
> --devtool eval - 为你的代码创建源地址。当有任何报错的时候可以让你更加精确地定位到文件和行号
> --progress - 显示合并代码进度
> --colors - Yay，命令行中显示颜色！
> --content-base build - 指向设置的输出目录

3. 访问 http://localhost:8080 会看到效果

# 浏览器自动刷新

当运行 webpack-dev-server 的时候，它会监听你的文件修改。当项目重新合并之后，会通知浏览器刷新。

1. 为了能够触发这样的行为，你需要把你的 index.html 放到 build/ 文件夹下，

然后，需要在index.html中增加一个脚本当发生改动的时候去自动刷新应用：

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
      </head>
      <body>
        <script src="http://localhost:8080/webpack-dev-server.js"></script>
        <script src="bundle.js"></script>
      </body>
    </html>
    
2. 在webpack.config.js配置中增加一个入口点

    var path = require('path');

    module.exports = {
      entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'app/main.js')],
      output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
      },
    };
    
3. 现在应用就可以在文件修改之后自动刷新了

## 默认自动刷新方式

在上面我们创建了 index.html 文件来获取更多的自由和控制，这样在http://localhost:8080/就可以自动刷新。

另一种方式是不需要创建index.html, 直接访问http://localhost:8080/webpack-dev-server/bundle 运行应用。

这会触发一个默认的我们不能控制的 index.html ，它同样会触发一个允许iFrame中显示重合并的过程。

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

    npm install --save react
    npm install --save react-dom

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
    import Hello from './component';

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

1. 安装babel-loader
    
    npm install --save-dev babel-loader
    npm install --save-dev babel-core
    npm install --save-dev babel-preset-es2015
    npm install --save-dev babel-preset-react
    
2. 配置 Webpack 来使用加载器

webpack.config.js

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
      }
    }

3. 运行 npm run dev，然后刷新页面就可以看到修改


# 参考

[React 和 Webpack 小书] (https://hainuo.gitbooks.io/react-webpack-cookbook/content/index.html)