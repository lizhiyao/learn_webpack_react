import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './component/hello.jsx';
import World from './component/world.jsx';

function main() {
  ReactDOM.render(
    <Hello />,
    document.getElementById('hello')
  );
  
  ReactDOM.render(
    <World />,
    document.getElementById('world')
  );
}

main();