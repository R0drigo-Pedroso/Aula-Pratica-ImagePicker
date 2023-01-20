import { useEffect, useState } from "react";
import { Button, Image, View } from "react-native";

import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample() {
  /* Caso usar useEffet tem que usar esse states */
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  /* como mostrar foto passo 01 */
  const [foto, setFoto] = useState();

  /* useEffect com referência - não é obrigatório */
  useEffect(() => {
    async function verficarPermissoes() {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      requestPermission(cameraStatus === "granted");
    }

    verficarPermissoes();
  });

  const acessarCamera = async () => {
    const imagem = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.5,
    });
    console.log(imagem);

    /* como mostrar foto - Passo 02 buscar dentro da array no log  */
    setFoto(imagem.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Acessar Câmera" onPress={acessarCamera} />

      {/* como mostrar foto - Passo 03 fazer um condicional  */}
      {foto && (
        <Image source={{ uri: foto }} style={{ width: 300, height: 200 }} />
      )}
    </View>
  );
}
