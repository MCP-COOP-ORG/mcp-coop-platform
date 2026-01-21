import './CoopItem.scss'

interface CoopItemProps {
  title?: string
}

const CoopItem = ({ title = 'Кооператив' }: CoopItemProps) => {
  return (
    <article className="coop-item">
      <h3 className="coop-item__title">{title}</h3>
      <p className="coop-item__placeholder">Здесь будет информация о кооперативе</p>
    </article>
  )
}

export default CoopItem

