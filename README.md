[![Travis CI](https://travis-ci.com/scriptex/dator.svg?branch=master)](https://travis-ci.com/scriptex/dator)
[![Github Build](https://github.com/scriptex/dator/workflows/Build/badge.svg)](https://github.com/scriptex/dator/actions?query=workflow%3ABuild)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/34d3d75710534dc6a38c3584a1dcd068)](https://www.codacy.com/gh/scriptex/dator/dashboard?utm_source=github.com&utm_medium=referral&utm_content=scriptex/dator&utm_campaign=Badge_Grade)
[![Codebeat Badge](https://codebeat.co/badges/d765a4c8-2c0e-44f2-89c3-fa364fdc14e6)](https://codebeat.co/projects/github-com-scriptex-dator-master)
[![CodeFactor Badge](https://www.codefactor.io/repository/github/scriptex/dator/badge)](https://www.codefactor.io/repository/github/scriptex/dator)
[![DeepScan grade](https://deepscan.io/api/teams/3574/projects/5257/branches/40799/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=3574&pid=5257&bid=40799)
[![Analytics](https://ga-beacon-361907.ew.r.appspot.com/UA-83446952-1/github.com/scriptex/dator/README.md?pixel)](https://github.com/scriptex/dator/)

# Dator. Vali-Dator

> Intuitive frontend forms validator based on HTML5 attributes and a tiny bit of JavaScript.

## Visitor stats

![GitHub stars](https://img.shields.io/github/stars/scriptex/dator?style=social)
![GitHub forks](https://img.shields.io/github/forks/scriptex/dator?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/scriptex/dator?style=social)
![GitHub followers](https://img.shields.io/github/followers/scriptex?style=social)

## Code stats

![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/scriptex/dator)
![GitHub repo size](https://img.shields.io/github/repo-size/scriptex/dator?style=plastic)
![GitHub language count](https://img.shields.io/github/languages/count/scriptex/dator?style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/scriptex/dator?style=plastic)
![GitHub last commit](https://img.shields.io/github/last-commit/scriptex/dator?style=plastic)

## About

There are a lot of form validators out there. This one aims at intuitive API and relies on extensive usage of HTML data-\* attributes.
It's important to note that in order to use the validation, the `required` attribute must be present on your HTML element.

## Demo

[Here](https://dator.atanas.info) is a demo showing how to use the validator and all built-in validation types:

## Install

```sh
npm i dator

# or

yarn add dator
```

or include it from unpkg.com

```html
<script src="https://unpkg.com/dator"></script>
```

## Usage

In your JavaScript file:

```javascript
import { Validator } from 'dator';

const myForm = document.querySelector('form');
const datorSettings = {}; // see below for more details
const datorCustomTypes = {}; // see below for more details

const formValidator = new Dator(myForm, datorSettings, datorCustomTypes);
```

In your HTML file:

```html
<input type="text" name="full-name" required data-validate="name" />
```

The constuctor accepts three arguments:

1. DOM element for the form that needs to be validated (Required)
2. Object with settings (Optional) - more below
3. Object with custom validation types - more below

## Settings

```javascript
// These are the settings and their default values
const datorSettings = {
	validClass: 'is--valid', // The CSS classname that will be added to a valid form element
	errorClass: 'is--invalid', // The CSS classname that will be added to an invalid form element
	validatedClass: 'is--validated', // The CSS classname that will be added to the validated form
	watch: true, // If the validation should be applied "as-you-type"
	classHolder: null, // The CSS classname of the element that should receive the `validClass` and `invalidClass`
	beforeValidate: null, // A function to run before the actual form submission
	onSubmit: null, // A function to run during the actual form submission
	afterValidate: null // A function to run after the actual form submission
};
```

## Validation types

There are several built-in validation types:

-   name
-   zip
-   presence
-   email
-   phone
-   address
-   integer
-   float
-   credit-card
-   cvc

All of these validation types represent a regular expression which is used to test the value of the form element against to.

In order to add more validatior types, use the third constructor argument as shown above.

For example, if you need to add a new `zip` type:

```javascript
const datorCustomTypes = {
	zip: /^\d{4}$/ // Change from 5 digits to 4 digits
};
```

## LICENSE

MIT

---

<div align="center">
    Connect with me:
</div>

<br />

<div align="center">
    <a href="https://atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/logo.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="mailto:hi@atanas.info">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/email.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.linkedin.com/in/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linkedin.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://github.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/github.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://gitlab.com/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/gitlab.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://twitter.com/scriptexbg">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/twitter.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.npmjs.com/~scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/npm.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://www.youtube.com/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/youtube.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://stackoverflow.com/users/4140082/atanas-atanasov">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/stackoverflow.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://codepen.io/scriptex/">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codepen.svg" width="20" alt="">
    </a>
    &nbsp;
    <a href="https://profile.codersrank.io/user/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/codersrank.svg" height="20" alt="">
    </a>
    &nbsp;
    <a href="https://linktr.ee/scriptex">
        <img src="https://raw.githubusercontent.com/scriptex/socials/master/styled-assets/linktree.svg" height="20" alt="">
    </a>
</div>

---

<div align="center">
Support and sponsor my work:
<br />
<br />
<a href="https://twitter.com/intent/tweet?text=Checkout%20this%20awesome%20developer%20profile%3A&url=https%3A%2F%2Fgithub.com%2Fscriptex&via=scriptexbg&hashtags=software%2Cgithub%2Ccode%2Cawesome" title="Tweet">
	<img src="https://img.shields.io/badge/Tweet-Share_my_profile-blue.svg?logo=twitter&color=38A1F3" />
</a>
<a href="https://paypal.me/scriptex" title="Donate on Paypal">
	<img src="https://img.shields.io/badge/Donate-Support_me_on_PayPal-blue.svg?logo=paypal&color=222d65" />
</a>
<a href="https://revolut.me/scriptex" title="Donate on Revolut">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/revolut.json" />
</a>
<a href="https://patreon.com/atanas" title="Become a Patron">
	<img src="https://img.shields.io/badge/Become_Patron-Support_me_on_Patreon-blue.svg?logo=patreon&color=e64413" />
</a>
<a href="https://ko-fi.com/scriptex" title="Buy Me A Coffee">
	<img src="https://img.shields.io/badge/Donate-Buy%20me%20a%20coffee-yellow.svg?logo=ko-fi" />
</a>
<a href="https://liberapay.com/scriptex/donate" title="Donate on Liberapay">
	<img src="https://img.shields.io/liberapay/receives/scriptex?label=Donate%20on%20Liberapay&logo=liberapay" />
</a>

<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" title="Donate Bitcoin">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/bitcoin.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" title="Donate Etherium">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/etherium.json" />
</a>
<a href="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" title="Donate Shiba Inu">
	<img src="https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/scriptex/scriptex/master/badges/shiba-inu.json" />
</a>
</div>
