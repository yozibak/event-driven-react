
# Event Driven React

This repository shows an example workaround to manage the app's events (i.e. domain logics). 

By using this architecture, the app will get more testable and scalable. 

This architecture pattern is especially suitable for React projects that:

- should handle data subscription events (e.g. receiving GraphQL messages)
- should handle time-based events
- should scale in the future, but not built on top of Redux

## Demo

See working demo on Stackblitz: 
https://react-ts-7indhb.stackblitz.io

The app is "Plant Simulator". The weather changes every second and plant grows or dies (the "event" in this app). 

## The Architecture

There are 3 layers in this architecture.

### Store

- hold state and expose
- provide functions to modify states
- do NOT access other stores' state

### Service

- detect events
- consume events
- provide "commands" (not in this repo)

### UI

- render data querying stores

## Background

Our project was seeing a "big ball of mud". Hooks and components were using each other dependently, and it was becoming hard to scale the app. 

I came up with this pattern while learning so-called "event-driven architecture". Since EDA is basically an OOP practice, it might look a little different here. The state management and hooks should be under React component, so all the layers explained are under the top-level `<App />`  component.

I refactored the entire project architecture so that it can be bearable for future development. It became more unit-testable, and it actually got more tests. The domain rules became more clear to everyone on the team. 

# Caveats

- If this kind of architecture is in need, it might be better to build on top of Redux in the first place. 
- This pattern requires developers to understand the bits of OOP practices, which you can't expect from most React devs. You need to "pitch" to your team if you were to use this pattern in your project. 

