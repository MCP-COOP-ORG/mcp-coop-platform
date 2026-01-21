import { Card, CardHeader, CardBody } from '@heroui/react'

interface CoopItemProps {
  title?: string
}

const CoopItem = ({ title = 'Кооператив' }: CoopItemProps) => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold">{title}</h3>
      </CardHeader>
      <CardBody>
        <p className="text-default-500">Здесь будет информация о кооперативе</p>
      </CardBody>
    </Card>
  )
}

export default CoopItem

