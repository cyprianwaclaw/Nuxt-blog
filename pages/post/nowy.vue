<template>
    <div>
      <label for="fileInput">Wybierz plik:</label>
      <input v-model="title" placeholder="title" />
      <input type="file" id="fileInput" @change="handleFileChange" />
      <button @click="send">click</button>
    </div>
  </template>
  
  <script setup lang="ts">
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  
  let selectedFile: File | null = null;
  const title = ref();
  const imageUrl = ref();
  
  const handleFileChange = (event: any) => {
    selectedFile = event.target.files[0];
  
    if (selectedFile) {
      // Tutaj możesz przetworzyć lub wysłać wybrany plik
      console.log("Wybrano plik:", selectedFile.name);
    }
  };
  
  const send = async () => {
    const fileName = ref()
    if (selectedFile) {
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("post-hero")
        .upload(selectedFile.name, selectedFile);
        fileName.value = selectedFile.name
      if (uploadError) {
        console.error("Błąd podczas przesyłania pliku:", uploadError.message);
      } else {
        console.log("Plik został przesłany:", uploadData);
  
        // // Pobierz przesłane zdjęcie
        // const { data: image, error: imageError } = await supabase.storage
        //   .from("post-hero")
        //   .download(fileName.value);
  
        // if (imageError) {
        //   console.error("Błąd podczas pobierania pliku:", imageError.message);
        // } else {
        //   imageUrl.value = URL.createObjectURL(image as any);
        //   console.log("Pobrano zdjęcie:", imageUrl.value);
  
          // Teraz możesz wykonać operację wstawiania danych do bazy danych
          const dataInsert = {
            title: title.value,
            user_id: user.value.id,
            image: 'https://hsrgxmvwibborxhebppx.supabase.co/storage/v1/object/public/post-hero/' + selectedFile.name // Możesz użyć nazwy pliku jako informacji o obrazie w bazie danych
          };
          const { data: insertData, error: insertError } = await supabase
            .from("posts")
            .insert(dataInsert as any)
            .select();
  
          if (insertError) {
            console.error("Błąd podczas wstawiania danych:", insertError.message);
          } else {
            console.log("Dane zostały wstawione:", insertData);
          }
        // }
      }
    }
  };
  </script>