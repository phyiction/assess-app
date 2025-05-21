# WWG Assessment App

This a single page web app that enables you to take the following assessments:

- Insights Discovery
- Spiritual Gifts
- EML: How Healthy is Your Ability to Lead Out of Your Marriage or Singleness
- Knowing your Giftings, Strengths, and Passions

The web browser's [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is used to persist assessment data.

## Development

```
docker build . -t assess-app
```

```
docker run --name nginx-assess-app -d -p 8080:80 -t assess-app
```
