# Intro 
Kosdapapa is a test project in which I have ChatGPT create a piggy bank site for my daughters in which they can check whether they can buy something

# Disclaimer
This is a hobby project  for personal use only. This allowed me to skip important aspects like authorization and proper handling and sharing of personal "financial data". Feel free to use this in any way you see fit, but please realize that I made conscious choices about not implementing these important aspects so I could keep the complexity low. You should make your own choices concerning aspects like authorization, security, proper usage of personal data etc., matching your own goals and context.

# Features

You can define for who you want to show a piggybank site in the json file (/assets/children-data.json). You can define the following properties for each child:
* name - is used for the title
* favoriteColor - the child's favorite color, currently used for the progress bar
* backgroundColor - currently used for the background of the piggy bank panel
* profileImage - used to display an image in the piggy bank panel

Functions
* you can see the balance of your piggy bank
* you an edit the balance of your piggy bank in the edit panel
* you can enter an item price and see whether you can afford the item
* If a price is entered you can also see which bills and coins you need for the price to give you a better idea how much the item costs.
* if a prices is entered you can also open a shop-comparison panel which lists reference items , how much they cost, and how many you can buy for the entered price. You can define the reference items in a json file (assets/reference-items.json)

# Dev challenge

I tried to get as much coding done by ChatGPT as possible. So just by trying to tell it what I wanted, what results I got, how I wanted it to look. Eventually, I needed quite some manual fixing...

I started some new threads to see whether it would significantly change (read: improve) my responses :) See ChatGPT threads:

    https://chat.openai.com/share/6c12e654-44b4-4734-859e-6759f7276f17
    https://chat.openai.com/share/3fda0cc7-7210-4fff-aec7-08f2d684a93a
    https://chat.openai.com/share/4c999005-26f6-4bc6-ad57-14bf2816cf3d
    https://chat.openai.com/share/cc125b12-a4c7-40b0-90fb-5c23504e1449
    https://chat.openai.com/share/a9c53080-09c3-4c83-832d-ec221beb7f5e 

Failed:

    https://chat.openai.com/share/6124ee18-165a-4605-8320-84dddb42e853
        Github access and dynamic site
        CGPT was unable to access, dynamic site without framework got too complex.
