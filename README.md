# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

## Solution notes

The wireframe suggests displaying both the photographer, and the country in the resulting photo display. The country is not one of the fields that is included on the search response, so I've omitted it.


## Solution Architecture

- Styling. Just plain CSS. For a simple demonstration like this, KISS.

- State management. None. 
The complexity of this challenge is in the PhotoSearchInput, and having it throttle the requests. Real world, IMO such a component shouldn't rely on external state management being present anyway. Generally speaking it's better if a component is self-sufficient. 

## Comments 

💬 - Comment about the solution. 'Discuss this in pull request' type comments.

☝️ - Note. Comments that don't 

🧑‍🔬 - Comments about Vue itself, observations I'm making given that I'm new to it. 