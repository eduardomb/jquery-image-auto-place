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
*   <div id="#content">
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
*     $('#text').imageAutoPlace();
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
  $.fn.imageAutoPlace = function(offset) {
    var words = this.text().match(/([^ ]+)/g),
        next_height = 0,
        side = 'left',
        imgs = [];

    // Define the default offset.
    offset = offset === undefined ? 200 : offset;

    // Extract all images from div and put them on imgs array.
    $('img', this).each(function(){
      imgs.push($(this).clone());
      $(this).remove();
    })

    if (imgs.length) {
      // Erase div content.
      this.text('');

      // Reverse imgs array because it will be consumed backwards with pop().
      imgs.reverse();

      // Insert word by word into div and intercalates the images.
      for(i=0; i < words.length; i++) {
        if(i%100 == 0)
          console.log(this.height());
        // Insert img if div reaches the specified height.
        if (imgs.length && this.height() >= next_height) {
          $img = imgs.pop();
          $img.css({
            'float': side,
            'display': 'inline-block',
            'padding': '10px',
          });

          // Remove inconvenient padding.
          //
          if (side == 'left')
            $img.css('padding-left', 0);

          else
            $img.css('padding-right', 0);

          if (i == 0)
            $img.css('padding-top', 0);

          // Define the height div must reach to insert next img.
          next_height = this.height() + $img.height() + offset;

          // Invert side of next img.
          side = side == 'right' ? 'left' : 'right';

          // Append img to div.
          this.append($img);
        }

        // Insert one more word to div.
        this.append(words[i] + ' ');
      }
    }

    return this;
  };
})(jQuery);
