# Architecture

## Accessability Additions
- Custom choosers have complex accessibility requirements, and getting accessibility wrong on them can make usability terrible for everyone. For this type of field, I would normally pick something out of rsute or a customizable business UI package. If I were rolling my own, I'd likely have a conversation with another mid/senior on the pitfalls they are aware of that I might not be. The mid/senior may also be aware of another project (the example in this case) with a search field that could be repurposed. The mid/senior may also be aware of an accessible lib that is in use in other projects or the current project.
- add correct HTML roles to list items - I will likely need to research more as I need to get more familiar with the ones for custom drop-downs and search.
- Loop back in with design/product with how the tab cursor should go A)  What order should they go in? B) Should it become trapped in a loop with an exit point?
- Consider making the tab cursor loop and having a skip items button.
- Next time, consider using a portal or popover and align that to the field. If the component was a trap, set the tab cursor on the body to -1. 
- Consider returning the cursor to the input or arrow button, so the user does not become lost after choosing an option. This would also take the text cursor back to where it was in the input field.
- I'm not a huge fan of alerts - I would use a toast with the correct alert role, as this avoids stealing the focus.
- consider testing in more browsers to weed out platform-specific bugs. I've probably used a few features that won't run in Trident Edge or older Safari/Webkit.
- Add alt text to the button or use a symbol that better indicates its purpose to help those with low computer literacy.
- Add error text with correct accessibility roles to the input or use setCustomValidity
- use some processing/loading indicator to inform users of loading. This could be implemented with a tag with an alert role so the screen reader reads it out. 
- Add a no results indicator. This could be implemented with a tag with an alert role so the screen reader reads it out. 
- Add instructions before the input or a help button. This would be helpful for screen readers or those with low computer literacy. This may or may not be appropriate depending on where this field appears in the UI.
- Test in the WAVE accessibility plugin: Button missing text, No heading structure, No page regions

## Accessibility Implemented
- Roles are set correctly based on a few minutes of research. It seams to be close to the example provided. The example does appear to have there a few more accessability things going on. I Would probably want to submit a PR before considering this task "done, done."
- id for field+labels+list items are set and unique
- buttons have a type so, they don't get confused for submits in a form
- alt is set on the button
- placeholder and label are set. And labels for attribute matches the input's id. I suggest allowing the id to provided as a pro for cases where it needs to be used in the parents' functionality. 
- we pass AA and AAA contrast with 8.59:1
- the tab cursor goes in what I consider a sensible order.
- input fields text size is above 16px and are all in rem. 
- UI remains correct at 200% text scaling. There is a bug. I need to figure out where the options box is under the arrow button at 200%. I removed the non-accessible default fixed pixel size hidden on the html.
- hover/focus states are custom or using the browser defaults - would likely want to have a chat with design or the lead dev so that components match with the rest of the UX in the project.

## Added Libs
- rsute - I looked at adding this library but using it would have meant removing the existing items list.
- scss - the CSS nesting was getting cumbersome, so I switched to SCSS. I prefer "styled-components" (just not creating a new one every time I need another JSX element in my components)
- TypeScript - this project appears to be using JS doc, which I have some experience in, but it was faster in TS because of how my IDE is configured. I would follow what everyone else is using on an actual project instead of introducing a different typing package.
- use-debounce - I could roll my own debounce function or I could use one for React that thousands of others have been using and testing.
- use-async-setstate - useful when you need to do async state changes or get state outside of the main render loop.
- clsx - used for cleanly calculating class lists. Used only once in place I might be able to get away with using [aria-selected="true"] but I would have to see what support for that is like.

## Implemented (Other)
- created a component for the auto completing search field to go into so that Input can be re-used. Followed requirements 1 & 2. Moved the example into Affinity Designer to get more accurate units. 
- a custom API class based on the one that I was used to at JM. Including a custom Error Class where I can still get data
- moved the example JSON for the API into there own stub folder.
- set up a types folder - which isn't auto included.
- extended the Input to support a few new features
- made some changes to the ResultsList for styling.
