# image_search

Image Search Abstraction Layer
Free Code Camp Back End Project

Example usage: 

- To search for images: 
https://localhost:3000/api/imagesearch/cats
- To skip first 2 results of your search: 
https://localhost:3000/api/imagesearch/cats?offset=2

Example creation output 
{"image_url":"https://www.bing.com/cr?IG=AC7F9A04FECE44309B6CE43BC34FD983&CID=15EA276671AA65C727BB2D03704D6469&rd=1&h=9a0hBGINttuy0opQpBJDVq2My3VbWz7zk842_L9DSfw&v=1&r=https%3a%2f%2fwww.bing.com%2fimages%2fsearch%3fview%3ddetailv2%26FORM%3dOIIRPO%26q%3dcats%26id%3dDF010D14AC241C0AC39B5EAFD85F8B117825C79B%26simid%3d608001211154301430&p=DevEx,5006.1","snippet":"Proxecto Gato: cats wallpapers by bighdwallpapers","thmubnail":{"width":300,"height":225},"context":"proxectogato.blogspot.com/2012/08/cats-wallpapers-by..."}

To view last 10 queries 
https://localhost:3000/api/latest/imagesearch 

Example creation output 
{"term":"cats","when":"2017-04-15T13:06:30.621Z"}
