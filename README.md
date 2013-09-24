Marquis Bonding and Insurance Website
===========

You’re welcome, Ma.

So, here’s what we have goin’ here: the Gruntfile, rather than just churning out individual files for distribution, creates the entire *site* ready to ship. You set your virtual host to look at that `dist` folder as the document root, run your `watch` task, and you’re looking at the ready-to-ship version of the site while you work in your `_tmpl` directory.

You can divvy up your “basic” and “enhanced” CSS and JavaScript by directories, the contents of which get concatenated into single respective files—ready for conditional loading based on whatever “<a href="http://responsivenews.co.uk/post/18948466399/cutting-the-mustard">cutting the mustard</a>” criteria you decide on.

I should do a `grunt-init` template for this.

Or maybe I should just finish this website already.