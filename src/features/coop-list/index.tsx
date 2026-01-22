import { Card, CardHeader, CardBody } from '@heroui/react';

export default function CoopList() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Каталог кооперативов</h2>
      </CardHeader>
      <CardBody>
        <p className="text-default-500">Здесь будет список кооперативов</p>
      </CardBody>
    </Card>
  );
}

