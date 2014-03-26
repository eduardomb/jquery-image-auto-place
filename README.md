jQuery Image Auto Place
=======================

jQuery plugin to re-arrange images among a text to provide a magazine like
layout. The first image is placed on the left side, the second on the right,
the third on left, and so on.

Usage Example
-------------
```html
    <div id="content">
      <img style="width: 200px; height: 100px; border: 1px;" src="" alt="" />
      <img style="width: 200px; height: 100px; border: 1px;" src="" alt="" />
      <img style="width: 200px; height: 100px; border: 1px;" src="" alt="" />

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean volutpat
      mi eget nisi sagittis ac auctor ligula feugiat. Nam congue molestie arcu
      at ornare. Aliquam dictum viverra eros, in laoreet ligula venenatis id.
      Maecenas quis lectus ac nibh mattis cursus. Duis iaculis scelerisque.
    </div>

    <script type="text/javascript">
      $('#content').imageAutoPlace();
    </script>
```

The above example will rearrange the images to the following layout:

```
    |       | Lorem ipsum dolor
    | Image | sit amet, consect
    |       | etur adipiscing e
    lit. Aenean volutpat mi ege
    t nisi sagittis ac auctor l
    igula feugiat. Na |       |
    m congue molest i | Image |
    e arcu at ornare. |       |
    Aliquam dictum viverra eros
    in laoreet ligula venenatis
    |       | id. Maecenas quis
    | Image | lectus ac nibh ma
    |       | tisi cursus. Duis
    iaculis scelerisque.
```

Default Options
---------------
```
    {
      padding: 10,        // * Image padding
      offset: 200,        // * Minimum vertical space (px) btween images.
      initialOffset: 0,   // * Minimum vertical space (px) before first image.
      imgSelector: 'img', // * Image selector. Ex: use 'img.foo' to only auto
                          //   place imgs containing class foo.
      chunkSelector: ''   // * Ex: 'p'. Images will be placed btween chunks. If
                          //   set to empty, the element content will be
                          //   converted to pure text (tags will be removed)
                          //   and each word will be a chunk.
    }
