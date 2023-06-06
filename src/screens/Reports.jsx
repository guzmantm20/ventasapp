import { Button, Text } from 'react-native'
import React from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'

const Reports = () => {
  return (
    <Background>
      <BackButton title={"Reportes"} />
      <Text>Reportes</Text>
      <Button
        title="Logout"
        onPress={() => logout()}
      />
    </Background>
  )
}

export default Reports