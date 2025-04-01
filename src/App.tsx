import { Flex } from "@chakra-ui/react"
import ZipPage from "./components/zipPage"

function App() {

  return (
    <Flex h="100vh" w="100vw" bg="red.100" alignItems="center" justifyContent="center">
      <ZipPage />
    </Flex>
  )
}

export default App
