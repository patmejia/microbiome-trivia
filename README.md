# Trivia Game
[Link to Trivia game: here](https://mejia-code.github.io/microbiome-trivia/)
Shows how to use HTML, CSS and JS only to create a quiz form.

[wip: fix save highscores]*

# Some Concepts

Definition and Usage

## `<span>`

- The `<span>` tag is much like the `<div>` element, but `<div>` is a block-level element and `<span>` is an inline element.

- The `<span>` tag is an inline container used to mark up a part of a text, or a part of a document.

- The `<span>` tag is easily styled  by CSS or manipulated with JavaScript using the class or id attribute.

## `*` <br> the universal selector

## `vh` & `vw`

`vh` stands for **viewport height** and `vw` is for **viewport width**. Hence, setting an element to a width value of `50vw` means that the element will have a
$$
width.of.object = 50\%*(size.of.viewport)
$$
This stays true when the viewport is resized.

## HUD: Heads-Up Display

What is a HUD element?
> HUD elements could include a mini-map in the corner, a health bar, and a variety of other items to aid the player. The HUD is there to present the player with important information while not being distracting. A great example of a heads up display is in the Halo series.

## In CSS, 
# **`#`** versus **`.`** 

`#` is an `id` selector, used to target a single specific element with a unique id, but `.` is a `class` selector used to target multiple elements with a particular class. To put it another way:

`#foo {}` will style the single element declared with an attribute id="foo"
`.foo {}` will style all elements with an attribute class="foo" (you can have multiple classes assigned to an element too, just separate them with spaces, e.g. `class="foo bar"`). [reference](https://stackoverflow.com/questions/602168/in-css-what-is-the-difference-between-and-when-declaring-a-set-of-styles)
