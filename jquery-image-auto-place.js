/**
* Image auto place plugin.
*
* Author: Eduardo M. Barbosa (eduardobarbosa81@gmail.com).
*
* Re-arrange images among a text to provide a magazine like layout. The first
* image is placed on the left side, the second on the right, the third on left,
* and so on.
*
* Usage Example:
*   <div id="content">
*     <img style="width: 200px; height: 100px; border: 1px;" src="" alt="" />
*     <img style="width: 200px; height: 100px; border: 1px;" src="" alt="" />
*     <img style="width: 200px; height: 100px; border: 1px;" src="" alt="" />
*
*     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat
*     mi eget nisi sagittis ac auctor ligula feugiat. Nam congue molestie arcu
*     at ornare. Aliquam dictum viverra eros, in laoreet ligula venenatis id.
*     Maecenas quis lectus ac nibh mattis cursus. Duis iaculis scelerisque.
*   </div>
*
*   <script type="text/javascript">
*     $('#content').imageAutoPlace();
*   </script>
*
* The above example will rearrange the images to the following layout:
*
*      |       | Lorem ipsum dolor
*      | Image | sit amet, consect
*      |       | etur adipiscing e
*      lit. Aenean volutpat mi ege
*      t nisi sagittis ac auctor l
*      igula feugiat. Na |       |
*      m congue molest i | Image |
*      e arcu at ornare. |       |
*      Aliquam dictum viverra eros
*      in laoreet ligula venenatis
*      |       | id. Maecenas quis
*      | Image | lectus ac nibh ma
*      |       | tisi cursus. Duis
*      iaculis scelerisque.
*
*/
(function($){
  'use strict';

  $.fn.imageAutoPlace = function(options) {
    // Default options.
    options = $.extend({}, {
      offset: 200,        // * Minimum vertical space (px) btween images.
      initialOffset: 0,   // * Minimum vertical space (px) before first image.
      imgSelector: 'img', // * Image selector. Ex: use 'img.foo' to only auto
                          //   place imgs containing class foo.
      chunkSelector: ''   // * Ex: 'p'. Images will be placed btween chunks. If
                          //   set to empty, the element content will be
                          //   converted to pure text (tags will be removed)
                          //   and each word will be a chunk.
    }, options);

    var $img,
        chunks,
        index = 0,
        nextSide = 'left',
        nextHeight = options.initialOffset,
        $images = $(options.imgSelector, this).hide(0); // Hide all images.

    // Define the chunks. Images will be inserted btween chunks.
    if (options.chunkSelector) {
      chunks = $(options.chunkSelector, this).hide(0);
    } else {
      chunks = this.text().match(/([^ ]+)/g);

      // Clear element, because words will be inserted interactively.
      this.text('');
    }

    for (var i = 0; i < chunks.length; i++) {
      // Place img if div reaches the specified height.
      if (index < $images.length && this.height() >= nextHeight) {
        $img = $($images[index++]);

        $img.css({
          'float': nextSide,
          'padding': '10px',
        });

        // Remove inconvenient padding.
        //
        $img.css('padding-' + nextSide, 0);

        if (i === 0) {
          $img.css('padding-top', 0);
        }

        // Place img.
        if (options.chunkSelector) {
          $(chunks[i]).before($img.remove().show(0));
        } else {
          this.append($img.remove().show(0)).height();
        }

        // Define the height div must reach to insert next img.
        nextHeight = this.height() + $img.height() + options.offset;

        // Invert side of next img.
        nextSide = nextSide == 'right' ? 'left' : 'right';
      }

      // Insert chunk.
      if (options.chunkSelector) {
        $(chunks[i]).show(0);
      } else {
        this.append(chunks[i] + ' ');
      }
    }

    return this;
  };
})(jQuery);
