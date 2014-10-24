/**
* Image auto place plugin.
*
* Author: Eduardo M. Barbosa (eduardobarbosa81@gmail.com).
*
* Re-arrange images among a text to provide a magazine like layout. For
* instance, the plugin can be configured to place the first image on the left
* side, the second on the right, the third on left, and so on.
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
*     $('#content').imageAutoPlace(loopPattern: ['left', 'right']);
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
      // Image padding
      padding: 10,

      // Minimum vertical space (px) btween images.
      offset: 200,

      // Minimum vertical space (px) before first image.
      initialOffset: 0,

      // Image selector. Ex: use 'img.foo' to only auto place imgs containing
      // class foo.
      imgSelector: 'img',

      // Ex: 'p'. Images will be placed btween chunks. If set to empty, the
      // element content will be converted to pure text (tags will be removed)
      // and each word will be a chunk.
      chunkSelector: '',

      // Images will be placed in this order. To only use left and right
      // images, use ['left', 'right'].
      loopPattern: ['center', 'left', 'right']
    }, options);

    var $img,
        chunks,
        position,
        pad = options.padding + 'px ',
        index = 0,
        nextHeight = options.initialOffset,
        originalMinHeight = this.css('min-height'),
        $images = $(options.imgSelector, this).hide(0); // Hide all images.

    // Min height greater than zero causes problems. We'll restore the original
    // min-height latter.
    this.css('min-height', 0);

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
      if (index < $images.length && this.outerHeight() >= nextHeight) {
        position = options.loopPattern[index % options.loopPattern.length];
        $img = $($images[index++]);

        // Set padding according to image position.
        if (position == 'center') {
          $img.css({
            // Add padding top if is not the first image and padding bottom.
            'padding': (i !== 0 ? pad : '0 ') + '0 ' + pad + ' 0'
          });
        } else if (position == 'left') {
          $img.css({
            // Add padding on all borders, except left.
            'padding': pad + pad + pad + '0',
            'float': 'left'
          });
        } else {
          $img.css({
            // Add padding on all borders, except right.
            'padding': pad + '0 ' + pad + pad,
            'float': 'right'
          });
        }
        if (i === 0) {
          $img.css('padding-top', 0);
        }

        // Place img.
        if (options.chunkSelector) {
          $(chunks[i]).before($img.remove().show(0));
        } else {
          this.append($img.remove().show(0));
        }

        // Define the height div must reach to insert next img.
        nextHeight = this.outerHeight() + $img.outerHeight() + options.offset;
      }

      // Insert chunk.
      if (options.chunkSelector) {
        $(chunks[i]).show(0);
      } else {
        this.append(chunks[i] + ' ');
      }
    }

    // Restore original min-height.
    this.css('min-height', originalMinHeight);

    return this;
  };
})(jQuery);
