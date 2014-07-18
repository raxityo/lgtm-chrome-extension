[LGTM chrome extension](https://chrome.google.com/webstore/detail/lgtm/ckjpjogecpcibagiggbejclbihmochpn?hl=en&gl=US)
=====================

This is a chrome extension which facilitates to add a configurable LGTM comment to github commits with a configurable keyboard shortcut.

## Bookmarklet
Don't want to install a chrome extension? Use this bookmarklet:
```
javascript:(function()%7Bvar%20a%3D%24(%22.js-new-comment-form%22)%3Ba.find(%22textarea%22).val(%22LGTM.%20%3A%2B1%3A%22)%3Ba.submit()%3B%7D)()
```
Which essentially does following:
```javascript
var commentForm = $(".js-new-comment-form");
commentForm.find("textarea").val("LGTM.");
commentForm.submit();
```

TODO
----
- Clean up JavaScript.
- Integrate [lgtm.in](http://lgtm.in).
- Implement this extension for Firefox. Why not?

Pull requests & feature requests are most welcomed.
