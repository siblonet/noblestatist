find . -maxdepth 1 -type f -name '*.html' \
  ! \( -name 'login.html' -o -name 'products-type-1-5.html' -o -name 'products-one-row.html' -o -name 'single-blog-1-3.html' -o -name 'about.html' -o -name 'products-left-sidebar.html' -o -name 'products-left-sidebar-2-3.html' -o -name 'faqs.html' -o -name 'contact.html' -o -name 'customer-service.html' -o -name 'checkout.html' -o -name 'cart.html' -o -name 'track-order.html' -o -name 'products-right-sidebar-2.html' \) \
  -exec rm {} +
