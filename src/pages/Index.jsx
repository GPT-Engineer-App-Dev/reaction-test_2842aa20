import React, { useState, useEffect } from "react";
import { Box, Button, Center, Container, Text, VStack, useToast } from "@chakra-ui/react";
import { FaStopwatch } from "react-icons/fa";

const Index = () => {
  const [gameState, setGameState] = useState("waiting"); // 'waiting', 'ready', 'clicked'
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const toast = useToast();

  useEffect(() => {
    if (gameState === "ready") {
      const timer = setTimeout(
        () => {
          setGameState("clicked");
          setStartTime(Date.now());
        },
        Math.floor(Math.random() * 1000) + 2000,
      ); // Wait between 2-3 seconds

      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleClick = () => {
    if (gameState === "waiting") {
      setGameState("ready");
    } else if (gameState === "ready") {
      toast({
        title: "Too soon!",
        description: "Don't click until the screen changes.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      setGameState("waiting");
    } else if (gameState === "clicked") {
      setEndTime(Date.now());
      setGameState("waiting");
    }
  };

  const reactionTime = endTime - startTime;

  return (
    <Container>
      <VStack spacing={5}>
        <Center py={10}>
          <FaStopwatch size="3em" />
        </Center>
        <Box width="100%" height="200px" bg={gameState === "ready" ? "green.500" : "red.500"} onClick={handleClick} cursor="pointer" />
        <Text fontSize="xl">
          {gameState === "waiting" && "Click anywhere to start"}
          {gameState === "ready" && "Wait for green..."}
          {gameState === "clicked" && "Click!"}
        </Text>
        {reactionTime > 0 && <Text fontSize="2xl">Reaction Time: {reactionTime} ms</Text>}
        <Button colorScheme="blue" onClick={() => setGameState("waiting")}>
          Restart
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
