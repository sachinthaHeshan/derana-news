This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# API Documentaion 

## News

Api Endpoint : [/api/news ](http://localhost:3000/api/news)

### <h3 >GET</h3>

You can fetch news using this method.

<h5>Query parameters</h5>
<table>
  <tr>
    <th>Parameter</th>
    <th>description</th>
    <th>Type</th>
    <th>Default</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>category</td>
    <td>Filter news by category</td>
    <td>string</td>
    <td>undefined</td>
    <td>sport</td>
  </tr>
 
</table>

<hr>

### <h3 >POST</h3>
This method allows you to create news in the database and automatically publish it on the news page.

<h5>Header parameters</h5>
<table>
  <tr>
    <th>Parameter</th>
    <th>description</th>
    <th>Type</th> 

  </tr>
  <tr>
    <td>token</td>
    <td>To verify authorised user from firebase</td> 
    <td>string</td>
  </tr>
</table>

<h5>Body values (application/json)</h5>
<table>
  <tr>
    <th>key</th>
    <th>description</th>
    <th>Type</th>
    <th>isRequired</th> 
  </tr>
  <tr>
    <td>headline</td>
    <td>Headline of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>  
  <tr>
    <td>content</td>
    <td>content of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>
  <tr>
    <td>imageURL</td>
    <td>imageURL of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>
  <tr>
    <td>category</td>
    <td>category of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>

</table>

<hr>

### <h3 >PATCH</h3>
This method allows you to update news in the database and automatically publish it on the news page.

<h5>Header parameters</h5>
<table>
  <tr>
    <th>Parameter</th>
    <th>description</th>
    <th>Type</th> 

  </tr>
  <tr>
    <td>token</td>
    <td>To verify authorised user from firebase</td> 
    <td>string</td>
  </tr>
</table>

<h5>Body values (application/json)</h5>
<table>
  <tr>
    <th>key</th>
    <th>description</th>
    <th>Type</th>
    <th>isRequired</th> 
  </tr>
  <tr>
    <td>id</td>
    <td>id (primary key)</td>
    <td>string</td>
    <td>true</td> 
  </tr>  
  <tr>
    <td>headline</td>
    <td>Headline of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>  
  <tr>
    <td>content</td>
    <td>content of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>
  <tr>
    <td>imageURL</td>
    <td>imageURL of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>
  <tr>
    <td>category</td>
    <td>category of the news</td>
    <td>string</td>
    <td>true</td> 
  </tr>

</table>

<hr>


### <h3 >DELETE</h3>
This method allows you to delete news in the database and automatically remove it on the news page.

<h5>Header parameters</h5>
<table>
  <tr>
    <th>Parameter</th>
    <th>description</th>
    <th>Type</th> 

  </tr>
  <tr>
    <td>token</td>
    <td>To verify authorised user from firebase</td> 
    <td>string</td>
  </tr> 
  <tr>
    <td>id</td>
    <td>id (primary key)</td>
    <td>string</td> 
  </tr>  
</table>

 

<hr>
