const ArticleBox = ({ article }) => {
  return (
    <div>
      <h1>{article?.title}</h1>
      <p>{article?.preview}</p>
      <img src={article?.cover?.path} alt={article?.cover?.alt} />
      <div dangerouslySetInnerHTML={{ __html: article?.body }} />
      <p>Published Status: {article?.status}</p>
    </div>
  )
}

export default ArticleBox
