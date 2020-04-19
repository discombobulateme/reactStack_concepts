import React from 'react';

//children = I'm accessing my component content
export default function Header({ title }) {
  return (
    <header>
      <h1>{ title }</h1>
    </header>
  );
}