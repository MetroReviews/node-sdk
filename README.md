<h2 align='center'>
  <img src="https://metrobots.xyz/img/logo.png" height='100px' width='100px' />
  <br> 
  Metro Reviews SDK
</h2>
<p align="center">
  Type Friendly Wrapper for the Metro Reviews API
</p>

<p align="center">

 [![Version](https://img.shields.io/badge/Version-v0.0.1%20-green.svg?style=flat)](https://github.com/MetroReviews/metro-sdk)
 [![NPM Version](https://img.shields.io/badge/NPM-v0.0.1-red.svg)](https://github.com/MetroReviews/metro-sdk)
 [![License Type](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/MetroReviews/metro-sdk)

</p>

---

## Installation

```shell
npm install metro-sdk (coming soon)
```

---

## Initialize the SDK

```js
const MetroAPI = require(`metro-sdk`)
const Metro = new MetroAPI.MetroClient('Your Secret Key')
```

---

## Update List

```js
await Metro.updateList({
  name: listInfo.name,
  description: listInfo.description,
  domain: listInfo.domain,
  claim_bot_api: listInfo.claim_bot_api,
  unclaim_bot_api: listInfo.unclaim_bot_api,
  approve_bot_api: listInfo.approve_bot_api,
  deny_bot_api: listInfo.deny_bot_api,
  reset_secret_key: false,
  icon: listInfo.icon
})
```