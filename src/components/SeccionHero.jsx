export default function SeccionHero({ titulo, subtitulo }) {
  return (
    <div className="seccion-hero">
      <h2>{titulo}</h2>
      <p className="mb-0 text-body-secondary fs-5">{subtitulo}</p>
    </div>
  )
}
