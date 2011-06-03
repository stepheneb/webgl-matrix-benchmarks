Simple benchmarks for testing the speed of JavaScript matrix libraries adapted from Brandon Jones benchmarks
in his glmatrix library: https://glmatrix.googlecode.com/hg/

If you have a browser with WebGL you can run the benchmarks [here](http://stepheneb.github.com/webgl-matrix-benchmarks/matrix_benchmark.html).

This work is based on Brandon's work as of this commit:

    e5ad8f6975eef038de668914a44ed36e2c611966
    Date:	October 10, 2010 12:49:00 PM EDT
    Upped version to 0.9.5

Comparing these matrix libraries:

* [glMatrix](http://code.google.com/p/glmatrix), [New BSD license](http://www.opensource.org/licenses/bsd-license.php)
* [mjs](http://code.google.com/p/webgl-mjs), [MIT license](http://www.opensource.org/licenses/mit-license.php)
* CanvasMatrix
* [EWGL_math](http://code.google.com/p/ewgl-matrices), [New BSD license](http://www.opensource.org/licenses/bsd-license.php)
* [tdl](http://code.google.com/p/threedlibrary/), [New BSD license](http://www.opensource.org/licenses/bsd-license.php)

Changes from Brandon's original benchmark code include:

* Only including the benchmark code from glmatrix.
* Updated to the latest mjs as of Dec 15: 16:8e5b0944ef1e and included it in several more tests.
* Added a graph display of the results using flotr, see: http://solutoire.com/flotr/
* Added tdl library (thanks to Gregg Tavares)
* each library runs in an iframe so the code won't affect the other libraries (thanks to Gregg Tavares)

Brandon's original code was released under the [New BSD license](http://www.opensource.org/licenses/bsd-license.php).
My additions to the benchmarking code are released under the same license.

## Running locally requires a web server.

With the recent changes by Gregg Tavares that run each library in an iFrame you will need to either:

* Run the benchmarks from a local web server
* Configure the browser to allow local file access

### Configuring Chrome to allow local file access

On Windows you can add a flag in the shortcut. 

On Mac OS X start Chrome from the command line like this:

    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --allow-file-access-from-files

### Using Python's SimpleHTTPServer

    cd /path/to/webgl-matrix-benchmarks
    python -m SimpleHTTPServer

Now open: <http://localhost:8000/matrix_benchmark.html>

### Set up an webgl-matrix-benchmarks.local local host and Apache vhost on Mac OS X

On OS X, turn on Web Sharing via (Apple Menu) -> System Preferences -> Sharing -> Web Sharing

Now, make sure that virtual hosting is enabled by editing `/private/etc/apache2/httpd.conf` and uncommenting the
virtual hosting line (at about line 465 of the stock `httpd.conf`) as follows:

    # Virtual hosts
    Include /private/etc/apache2/extra/httpd-vhosts.conf

At the top of httpd-vhosts.conf enable name-based virtual hosts for port 80 on all interfaces:

    NameVirtualHost *:80
    
Edit the virtual hosting configuration file `/private/etc/apache2/extra/httpd-vhosts.conf` to include the entry:

    <VirtualHost webgl-matrix-benchmarks.local:80>
       ServerName webgl-matrix-benchmarks
       DocumentRoot /path/to/webgl-matrix-benchmarks
       PassengerEnabled off
       <Directory /path/to/webgl-matrix-benchmarks >
         Options +Indexes +FollowSymLinks +MultiViews +Includes
         AllowOverride All
         Order allow,deny
         Allow from all
         DirectoryIndex matrix_benchmark.html
      </Directory>
    </VirtualHost>

    # after making changes ...
    # testing the config: apachectl configtest
    # restarting apache: sudo apachectl restart
    # or tailing the general apache2 error log
    # tail -n 200 -f /var/log/apache2/error_log[smartgraphs-git ruby-1.9.2-p180 (master)]$ 
    
after making changes ...

- test the config: `apachectl configtest` 

When the configuration syntax is correct ...
 
- restart apache:  `sudo apachectl restart`

(For more instructions, set <http://shapeshed.com/journal/setting_up_local_websites_on_snow_leopard/>.)

And, finally, edit your `/etc/hosts` file to include the following line:

    127.0.0.1       webgl-matrix-benchmarks.local

Confirm that the new entry works:

    $ dscacheutil -q host -a name webgl-matrix-benchmarks.local
    name: sc.local
    ip_address: 127.0.0.1

It might be necessary to flush the local DNS cache:

    $ sudo dscacheutil -flushcache

Now open: <http://webgl-matrix-benchmarks.local/>
