import * as i from "./instrumento.js";
import * as p from "./programa.js";
import * as parser from "./parser.mjs";



const app = Vue.createApp({
  

  data() {
    return {
     output: '',
//       titulo y banner
      mostrarBarraHorizontalSuperiorTituloYBanner: true,
      
//       banner and text-to-speech
      publish: false,
      textoDelBanner: 'Cumbia!!! Cumbia!!! Cumbia!!!',
      spanishVoices: [],
      selectedVoice: null,
      
//       imagen de fondo
      imagenDeFondo: 'image',
      hrefImagenDeFondo: 'https://cdn.glitch.global/1c9491c3-d804-48fe-9d1e-06e2c4f58528/bolsa-de-papas%202.svg?v=1720034945651',
      zoomInOrOut: 'zoom_in',
      sizeBase: 150,
      textSize: "150%",
      transparentCaret: true,
      yellowCaret: false,
      mostrarOpcionesMenuPanelDerecho: false,
      
// opciones panel izquierdo     
      barraHorizontalTituloIzquierdoYpos:136.553,
      tituloPanelIzquierdoYpos: 181.291,
      opcionesMenuIzquierdoYpos: 145.834,
      abrirMenuIzquierdoYpos: 136.5,
      contendoresPanelIzquierdoYpos: 199.5,
      saludosEditorYpos: 225,
      publicarSaludosCheckboxContainerYpos: 484.5,
      publicarSaludosCheckboxIconYpos: 490,
      publicarSaludosCheckboxYpos: 487,
      seleccionarVozContainerYpos: 484.5,
      seleccionarVozIconYpos: 490,
      seleccionarVozDropdownYpos: 490,
      botonEnviarSaludoContainer: 484.5,
      botonEnviarSaludoIcon: 490,
      translatePanelSaludos: "translate(0 0)",

      
      mostrarOpcionesMenuPanelIzquierdo: false,
      tituloPanelIzquierdo: 'Saludos',
      mostrarConexionesMidiContenedor: false,
      mostrarTutorialesContenedor: false,
      mostrarAcercaDeContenedor: false,
      mostrarSaludosContenedor: true,
      mostrarTituloPanelIzquierdo: true,
      saludos: "Saludos!!!",
      saludosTranslated: "Greetings!!!",
      errorConsole: "Seis8s v.2",

      // editor      
      barraHorizontalSuperiorXpos: 343.5,
      barraHorizontalSuperiorWidth:1023.94,
      menuDerechoXPos: 343.5, //348.002,
      menuDerechoYPos: 136.5,
      menuDerechoTransform: "translate(348.002 137.373)",
      menuDerechoMenuIcon: 14.6123,
      barraVerticalMenuDerechoXPos: 343.5, //406.507, 
      barraVerticalMenuDerechoYPos: 200.432,
      // barraVerticalRotation: "rotate(90 406.507 200.432)",
      iconosMenuDerechoXpos: 360,
      panelIzquierdoEstaVisible: true,
      showPlusSign: true,
      codeEditorImagenDeFondoXpos: 345.28,
      codeEditorImagenDeFondoWidth: 1020.61,
      codeEditorXpos: 343.5,
      consoleXpos: 343.606,
      consoleWidth:1023.96,
      anchoDelMenuDerecho: 63.0066,
      indiceDelDocumentoActivo: 0,
      numeroDeDocumento: 1,
      estaElDocumentoActivo: false,
      initXdocTab: 406.506,
      anchoDelDocTab: 168.017,
      initXCerrarDocIcono: 549.422,
      editorDeTextoWidth: 1024,
      isEditing: false,
      text: "",
      clicks: 0,
      timer: null,
      delay: 100, // Adjust the delay as needed
      initXPlusSsign: 575.524,
      espacioPlusSignYtab: 0.736,
      docs:[{name: "Documento 0", documentoActivo: true, textareaId: "textarea 0", xDocTab: 406.506, xCerrarDocIcono: 549.422, textEditor: ` tempo 100; \n armonia |Cmaj||Dm|; \n teclado (v 0.75, acompañamiento | 𝄽  𝅘𝅥  𝄽  𝅘𝅥 || 𝄽  𝅘𝅥  𝄽  𝅘𝅥 |);\n bajo (v 1, s 3, tumbao | 𝅘𝅥  𝄽  𝅘𝅥 /3 𝅘𝅥 /5 || 𝅘𝅥  𝄽  𝅘𝅥 /3 𝅘𝅥 /5 |); \n bombo ( v 0.90, ritmo | 𝅘𝅥  𝄽 𝅘𝅥 𝅘𝅥 |); \n contras ( v 0.9, ritmo |𝅘𝅥 𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥 𝅘𝅥𝅮 𝅘𝅥𝅮|);`,
}],
//       expandir pantalla
      pantallaCompletaVerticalmente: false,
      pantallaCompletaHorizontalmente: false,
      barraHorizontalSuperiorYpos: 135.379,
      barraHorizontalSuperiorHeight: 64.0886, 
      yPlusSsign: 135.344,
      yDocTab:135.347,
      yCerrarDocIcono:125,
      
      codeEditorImagenDeFondoYpos: 200.828,
      codeEditorImagenDeFondoHeight: 337.76,
      codeEditorYpos: 200.828,
      editorDeTextoHeight: 336, 
      consoleYpos: 536.918,
      
//       menu derecho
      menuDerechoIconXPos: 348.002,
      menuDerechoIconYPos:  145,
      expandRightCircleIconYpos: 560,
      expandUpCircleIconYpos: 510,
      imagenDeFondoIconYpos: 460,
      folderOpenIconYpos: 410,
      saveIconYpos: 360,
      ajustarTamanoIconYpos: 310,
      stopIconYpos: 260,
      playIconYpos: 210
      

    };
  },

  mounted() {
     // let ejemploDeInicio = ` tempo 150; \n armonia |Cmaj||Dm|; \n teclado (v 0.75, acompañamiento | 𝄽  𝅘𝅥  𝄽  𝅘𝅥 || 𝄽  𝅘𝅥  𝄽  𝅘𝅥 |);\n bajo (v 1, s 3, tumbao | 𝅘𝅥  𝄽  𝅘𝅥 /3 𝅘𝅥 /5 || 𝅘𝅥  𝄽  𝅘𝅥 /3 𝅘𝅥 /5 |); \n bombo ( v 0.90, ritmo | 𝅘𝅥  𝄽 𝅘𝅥 𝅘𝅥 |); \n contras ( v 0.9, ritmo |𝅘𝅥 𝅘𝅥𝅮 𝅘𝅥𝅮 𝅘𝅥 𝅘𝅥𝅮 𝅘𝅥𝅮|);`
    // this.agregaUnDocADocs();
    // this.$nextTick(() => {
    // this.docs[this.indiceDelDocumentoActivo].textEditor = ejemploDeInicio;
    // this.textEditor = ejemploDeInicio;
    // });
    
//     populate text-to-speech drodpdown
  const speechSynthesis = window.speechSynthesis;
    speechSynthesis.onvoiceschanged = () => {
      // Get the list of voices available
      let voices = speechSynthesis.getVoices();

      // Filter for Spanish voices
      this.spanishVoices = voices.filter(voice => voice.lang.includes('es'));
      

      // Call mandarSaludos when the voices have been populated
      // this.mandarSaludos();
    };
  },
  
  

  methods: {
  
   agregaUnDocADocs() {
     
   if (this.pantallaCompletaHorizontalmente == false){
        console.log("pantalla normal agregando un nuevo doc")

      // Determine the index of the last document, or start from 0 if docs is empty
      let newIndex;
      if (this.docs.length === 0) {
        this.initXPlusSsign = 575.524;
        this.initXdocTab = 406.506;
        this.initXCerrarDocIcono = 549.422; 
        newIndex = 0; // Start from 0 if no documents exist
      } else {
        // Extract numbers from document names to find the highest existing index
        const existingIndexes = this.docs.map(doc => parseInt(doc.name.match(/\d+$/)[0]));
        const maxIndex = Math.max(...existingIndexes);
        newIndex = maxIndex + 1;

        // Set positions based on the last document's positions
        let lastElementOfList = this.docs[this.docs.length - 1];
        this.initXdocTab = lastElementOfList.xDocTab + this.anchoDelDocTab;
        this.initXCerrarDocIcono = lastElementOfList.xCerrarDocIcono + this.anchoDelDocTab;
      }

      // Add the new document with calculated index and positions
      let newDoc = {
        name: `Documento ${newIndex}`,
        documentoActivo: true,
        textareaId: `textarea ${newIndex}`,
        xDocTab: this.initXdocTab,
        xCerrarDocIcono: this.initXCerrarDocIcono,
        textEditor: "",
      };
      this.docs.push(newDoc);

      // Activate and focus on the new document
      let id = this.docs.length - 1;
      this.activarDocumento(id);
      this.textEditorFocus(id);

      // Update position for the '+' sign if there are less than 5 documents
        if (this.docs.length < 5) {
         this.initXPlusSsign = this.docs[id].xDocTab + this.anchoDelDocTab + this.espacioPlusSignYtab;
        this.showPlusSign = true;
      } else {
        this.showPlusSign = false;
      }
     
   } else {
     
       // Determine the index of the last document, or start from 0 if docs is empty
      let newIndex;
      if (this.docs.length === 0) {
                  // doc.xDocTab = doc.xDocTab - (406.506 - this.anchoDelMenuDerecho);
        console.log("pantalla completa agregando un nuevo doc")
        this.initXPlusSsign = 231.6142  
        this.initXdocTab = 62.5962
        this.initXCerrarDocIcono = 205.51
        newIndex = 0; // Start from 0 if no documents exist
      } else {
        // Extract numbers from document names to find the highest existing index
        const existingIndexes = this.docs.map(doc => parseInt(doc.name.match(/\d+$/)[0]));
        const maxIndex = Math.max(...existingIndexes);
        newIndex = maxIndex + 1;

        // Set positions based on the last document's positions
        let lastElementOfList = this.docs[this.docs.length - 1];
        this.initXdocTab = lastElementOfList.xDocTab + this.anchoDelDocTab;
        this.initXCerrarDocIcono = lastElementOfList.xCerrarDocIcono + this.anchoDelDocTab;
      }

      // Add the new document with calculated index and positions
      let newDoc = {
        name: `Documento ${newIndex}`,
        documentoActivo: true,
        textareaId: `textarea ${newIndex}`,
        xDocTab: this.initXdocTab,
        xCerrarDocIcono: this.initXCerrarDocIcono,
        textEditor: "",
      };
      this.docs.push(newDoc);

      // Activate and focus on the new document
      let id = this.docs.length - 1;
      this.activarDocumento(id);
      this.textEditorFocus(id);

      // Update position for the '+' sign if there are less than 5 documents
        if (this.docs.length < 5) {
         this.initXPlusSsign = this.docs[id].xDocTab + this.anchoDelDocTab + this.espacioPlusSignYtab;
        this.showPlusSign = true;
      } else {
        this.showPlusSign = false;
      }
     
   }
},

  
    startEditing() {
      this.isEditing = true;
    },
    stopEditing() {
      this.isEditing = false;
    },

    
    textEditorFocus(index) {
  const textAreaId = this.docs[index].textareaId; // Retrieve the textareaId from the docs array

  this.$nextTick(() => {
    const textArea = document.getElementById(textAreaId); // Access the textarea using the ID

    if (textArea) {
      textArea.focus(); // Set focus on the textarea
      this.indiceDelDocumentoActivo = index;
      this.transparentCaret = true;
      this.yellowCaret = false;
    } else {
      console.error("Textarea with ID", textAreaId, "not found.");
    }
  });
},
    


    tabFocus(key) {
      this.$refs[key][0].focus();
      this.yellowCaret = true;
    },

    // evaluate,
    
     stop() {
        i.stopSequence();
    },
    
    stopShortCut(event) {
      if (event.ctrlKey && event.key === ".") {
        i.stopSequence();
      }
    },

    abrirMenuIzquierdo() {
      this.mostrarOpcionesMenuPanelIzquierdo =  !this.mostrarOpcionesMenuPanelIzquierdo;
      this.mostrarTituloPanelIzquierdo = !this.mostrarTituloPanelIzquierdo;
    },

    abrirMenuDerecho() {
      this.mostrarOpcionesMenuPanelDerecho =
        !this.mostrarOpcionesMenuPanelDerecho;

      if (this.mostrarOpcionesMenuPanelDerecho == true) {
        this.codeEditorImagenDeFondoXpos = this.codeEditorImagenDeFondoXpos + this.anchoDelMenuDerecho;
        this.codeEditorImagenDeFondoWidth =  this.codeEditorImagenDeFondoWidth - this.anchoDelMenuDerecho; 
          this.codeEditorXpos = this.codeEditorXpos + this.anchoDelMenuDerecho;
          this.editorDeTextoWidth = this.editorDeTextoWidth - this.anchoDelMenuDerecho 
          this.consoleWidth = this.consoleWidth - this.anchoDelMenuDerecho
          this.consoleXpos = this.consoleXpos + this.anchoDelMenuDerecho;
          // this.barraHorizontalSuperiorWidth= this.barraHorizontalSuperiorWidth 
    
 
        
      } else if (this.mostrarOpcionesMenuPanelDerecho == false) {
        this.codeEditorImagenDeFondoXpos = this.codeEditorImagenDeFondoXpos - this.anchoDelMenuDerecho;
        this.codeEditorImagenDeFondoWidth = this.codeEditorImagenDeFondoWidth + this.anchoDelMenuDerecho; 
          this.codeEditorXpos = this.codeEditorXpos - this.anchoDelMenuDerecho;
          this.editorDeTextoWidth = this.editorDeTextoWidth + this.anchoDelMenuDerecho 
          this.consoleXpos = this.consoleXpos - this.anchoDelMenuDerecho;
          this.consoleWidth = this.consoleWidth + this.anchoDelMenuDerecho
          // this.barraHorizontalSuperiorWidth= this.barraHorizontalSuperiorWidth 

      }
    },

    
activarDocumento(index) {
  this.indiceDelDocumento = index;
  this.docs.forEach((doc, i) => {
    doc.documentoActivo = i === index;
  });
  // console.log("Updated documentoActivo:", this.docs.map(doc => doc.documentoActivo));
  this.textEditorFocus(index);
  this.transparentCaret = true;
  this.yellowCaret = false;
},

    
    // CERRAR UN DOCUMENTO

    cerrarDocumento(index) {
      if (this.docs.length == 1) {
        let replaceXdocTab1 = this.docs[index].xDocTab;
        this.initXPlusSsign = replaceXdocTab1;
        this.docs.splice(index, 1);
      } else if (this.docs.length == 2) {
        if (index == 1) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          this.initXPlusSsign = replaceXdocTab1;
          this.docs.splice(index, 1);
          
          this.activarDocumento(index - 1);
          let textAreaRef = index - 1;
          this.textEditorFocus(textAreaRef);
        } else if (index == 0) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.initXPlusSsign = replaceXdocTab1 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          let textAreaRef = index;
          this.textEditorFocus(textAreaRef);
        }
      } else if (this.docs.length == 3) {
        if (index == 2) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          this.initXPlusSsign = replaceXdocTab1;
          this.docs.splice(index, 1);
          this.activarDocumento(index - 1);
          let textAreaRef = index - 1;
          this.textEditorFocus(textAreaRef);
        } else if (index == 1) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.initXPlusSsign = replaceXdocTab1 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        } else if (index == 0) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXdocTab2 = this.docs[index + 1].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          let replaceXcerrarDocIcono2 = this.docs[index + 1].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.docs[index + 2].xDocTab = replaceXdocTab2;
          this.docs[index + 2].xCerrarDocIcono = replaceXcerrarDocIcono2;
          this.initXPlusSsign = replaceXdocTab2 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        }
      } else if (this.docs.length == 4) {
        if (index == 3) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          this.initXPlusSsign = replaceXdocTab1;
          this.docs.splice(index, 1);
          this.activarDocumento(index - 1);
          let textAreaRef = index - 1;
          this.textEditorFocus(textAreaRef);
        } else if (index == 2) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.initXPlusSsign = replaceXdocTab1 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        } else if (index == 1) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXdocTab2 = this.docs[index + 1].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          let replaceXcerrarDocIcono2 = this.docs[index + 1].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.docs[index + 2].xDocTab = replaceXdocTab2;
          this.docs[index + 2].xCerrarDocIcono = replaceXcerrarDocIcono2;
          this.initXPlusSsign = replaceXdocTab2 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        } else if (index == 0) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXdocTab2 = this.docs[index + 1].xDocTab;
          let replaceXdocTab3 = this.docs[index + 2].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          let replaceXcerrarDocIcono2 = this.docs[index + 1].xCerrarDocIcono;
          let replaceXcerrarDocIcono3 = this.docs[index + 2].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.docs[index + 2].xDocTab = replaceXdocTab2;
          this.docs[index + 2].xCerrarDocIcono = replaceXcerrarDocIcono2;
          this.docs[index + 3].xDocTab = replaceXdocTab3;
          this.docs[index + 3].xCerrarDocIcono = replaceXcerrarDocIcono3;
          this.initXPlusSsign = replaceXdocTab3 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        }
      } else if (this.docs.length == 5) {
        if (index == 4) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          this.initXPlusSsign = replaceXdocTab1;
          this.showPlusSign = true;
          this.docs.splice(index, 1);
          this.activarDocumento(index - 1);
          let textAreaRef = index - 1;
          this.textEditorFocus(textAreaRef);
        } else if (index == 3) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.initXPlusSsign = replaceXdocTab1 + this.anchoDelDocTab;
          this.showPlusSign = true;          
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        } else if (index == 2) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXdocTab2 = this.docs[index + 1].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          let replaceXcerrarDocIcono2 = this.docs[index + 1].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.docs[index + 2].xDocTab = replaceXdocTab2;
          this.docs[index + 2].xCerrarDocIcono = replaceXcerrarDocIcono2;
          this.initXPlusSsign = replaceXdocTab2 + this.anchoDelDocTab;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        } else if (index == 1) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXdocTab2 = this.docs[index + 1].xDocTab;
          let replaceXdocTab3 = this.docs[index + 2].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          let replaceXcerrarDocIcono2 = this.docs[index + 1].xCerrarDocIcono;
          let replaceXcerrarDocIcono3 = this.docs[index + 2].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.docs[index + 2].xDocTab = replaceXdocTab2;
          this.docs[index + 2].xCerrarDocIcono = replaceXcerrarDocIcono2;
          this.docs[index + 3].xDocTab = replaceXdocTab3;
          this.docs[index + 3].xCerrarDocIcono = replaceXcerrarDocIcono3;
          this.initXPlusSsign = replaceXdocTab3 + this.anchoDelDocTab;
          this.showPlusSign = true;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        } else if (index == 0) {
          let replaceXdocTab1 = this.docs[index].xDocTab;
          let replaceXdocTab2 = this.docs[index + 1].xDocTab;
          let replaceXdocTab3 = this.docs[index + 2].xDocTab;
          let replaceXdocTab4 = this.docs[index + 3].xDocTab;
          let replaceXcerrarDocIcono1 = this.docs[index].xCerrarDocIcono;
          let replaceXcerrarDocIcono2 = this.docs[index + 1].xCerrarDocIcono;
          let replaceXcerrarDocIcono3 = this.docs[index + 2].xCerrarDocIcono;
          let replaceXcerrarDocIcono4 = this.docs[index + 3].xCerrarDocIcono;
          this.docs[index + 1].xDocTab = replaceXdocTab1;
          this.docs[index + 1].xCerrarDocIcono = replaceXcerrarDocIcono1;
          this.docs[index + 2].xDocTab = replaceXdocTab2;
          this.docs[index + 2].xCerrarDocIcono = replaceXcerrarDocIcono2;
          this.docs[index + 3].xDocTab = replaceXdocTab3;
          this.docs[index + 3].xCerrarDocIcono = replaceXcerrarDocIcono3;
          this.docs[index + 4].xDocTab = replaceXdocTab4;
          this.docs[index + 4].xCerrarDocIcono = replaceXcerrarDocIcono4;
          this.initXPlusSsign = replaceXdocTab4 + this.anchoDelDocTab;
          this.showPlusSign = true;
          this.docs.splice(index, 1);
          this.activarDocumento(index);
          this.textEditorFocus(index);
        }
      }
    },
    
mandarSaludos() {
  

  
      const message = new SpeechSynthesisUtterance();
      const speechSynthesis = window.speechSynthesis;
  
      message.volume = 1;
      // If there are Spanish voices available, use the selected one
      if (this.selectedVoice) {
        message.voice = this.selectedVoice;
      }

      message.lang = "es-MX"; // Set the language to Spanish
      message.text = this.saludos;
      speechSynthesis.speak(message);

      // Publish greeting in banner
      setTimeout(() => {
        if (this.publish == true) {
          this.textoDelBanner = this.saludos;
        };
      }, 0); // Delay the update of textoDelBanner by 10 seconds, 10000 milliseconds = 10 seconds
    },
  


    incrementarTamanoDeTexto(event) {
      if (!event.ctrlKey) {
        this.zoomInOrOut = 'zoom_in';
        this.sizeBase++;
        let updatedTextSize = this.sizeBase + "%";
        this.textSize = updatedTextSize;
      }
    },

    incrementarTamanoDeTextoShortCut(event) {
      if (event.ctrlKey && event.key === "=") {
        this.zoomInOrOut = 'zoom_in';
        this.sizeBase++;
        let updatedTextSize = this.sizeBase + "%";
        this.textSize = updatedTextSize;
      }
    },

    reducirTamanoDeTexto() {
      this.zoomInOrOut = 'zoom_out';
      this.sizeBase--;
      let updatedTextSize = this.sizeBase + "%";
      this.textSize = updatedTextSize;
    },

    reducirTamanoDeTextoShortCut() {
      if (event.ctrlKey && event.key === "-") {
        this.zoomInOrOut = 'zoom_out';
        this.sizeBase--;
        let updatedTextSize = this.sizeBase + "%";
        this.textSize = updatedTextSize;
      }
    },

    downloadText() {
      const blob = new Blob(
        [this.docs[this.indiceDelDocumentoActivo].textEditor],
        { type: "text/plain" }
      );
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "seis8s.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },

    loadFile(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.docs[this.indiceDelDocumentoActivo].textEditor = e.target.result;
        };
        reader.readAsText(file);
      }
    },
    

    cargarImagenDeFondo(event) {
      this.imagenDeFondo = 'image';
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document
            .getElementById("imageSrc")
            .setAttribute("href", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    
    removerImagenDeFondo(){
      this.imagenDeFondo = 'delete';
    document
      .getElementById("imageSrc")
      .setAttribute("href", '');
    }, 
        
    mostrarOpcionSaludos(){
      this.mostrarOpcionesMenuPanelIzquierdo = false;
      this.mostrarTituloPanelIzquierdo = true;
      this.tituloPanelIzquierdo = 'Saludos';
      this.mostrarSaludosContenedor = true;
      this.mostrarAcercaDeContenedor = false;
      this.mostrarTutorialesContenedor = false;
      this.mostrarConexionesMidiContenedor = false;
    }, 
    
    mostrarOpcionAcercaDe(){
      this.mostrarOpcionesMenuPanelIzquierdo = false;
      this.mostrarTituloPanelIzquierdo = true;
      this.tituloPanelIzquierdo = 'Acerca De';
      this.mostrarSaludosContenedor = false;
      this.mostrarAcercaDeContenedor = true;
      this.mostrarTutorialesContenedor = false;
      this.mostrarConexionesMidiContenedor = false;
    }, 
    
    mostrarOpcionTutoriales(){
      this.mostrarOpcionesMenuPanelIzquierdo = false;
      this.mostrarTituloPanelIzquierdo = true;
      this.tituloPanelIzquierdo = 'Tutoriales';
      this.mostrarSaludosContenedor = false;
      this.mostrarAcercaDeContenedor = false;
      this.mostrarTutorialesContenedor = true;
      this.mostrarConexionesMidiContenedor = false;
    }, 
    
    mostrarOpcionMidi(){
      this.mostrarOpcionesMenuPanelIzquierdo = false;
      this.mostrarTituloPanelIzquierdo = true;
      this.tituloPanelIzquierdo = 'MIDI';
      this.mostrarSaludosContenedor = false;
      this.mostrarAcercaDeContenedor = false;
      this.mostrarTutorialesContenedor = false;
      this.mostrarConexionesMidiContenedor = true;
    }, 

convertInput() {
  const activeDoc = this.docs[this.indiceDelDocumentoActivo]; // Access active document
  if (!activeDoc) {
    console.error("Active document not found.");
    return;
  }

  const textAreaId = activeDoc.textareaId; // Get textarea ID from active document
  // console.log("Active TextArea ID:", textAreaId);

  const textArea = document.getElementById(textAreaId); // Select the textarea by ID
  // console.log("Found TextArea:", textArea);

  if (textArea && typeof textArea.selectionStart === 'number') {
    const cursorPosition = textArea.selectionStart; // Save cursor position
    // console.log("Cursor position:", cursorPosition);

    const originalText = activeDoc.textEditor; // Original text from active document
    const modifiedText = this.processInput(originalText); // Modified text after processing

    // Update the editor's text content
    activeDoc.textEditor = modifiedText;

    // Calculate the difference in length between original and modified text
    const lengthDifference = modifiedText.length - originalText.length;
    // console.log("Length difference:", lengthDifference);

    // Restore the cursor position, adjusted by the length difference
    this.$nextTick(() => {
      const newCursorPosition = Math.max(0, cursorPosition + lengthDifference); // Prevent negative cursor positions
      const finalCursorPosition = Math.min(newCursorPosition, modifiedText.length); // Prevent exceeding text length

      // Set selection range to the updated cursor position
      textArea.setSelectionRange(finalCursorPosition, finalCursorPosition);
      textArea.focus(); // Ensure the textarea is focused
    });
  } else {
    console.error("Textarea element not found or cursor position not accessible:", textAreaId);
  }
},
   
     processInput(input) {
  // Split by spaces but keep pipes attached to the next command
  let commands = input.split(' ').map(cmd => {
    if (cmd.startsWith('|')) {
      // Handle the case where there is a pipe before the command
      let commandWithoutPipe = cmd.slice(1);  // Remove the pipe for processing
      return '|' + this.replaceCommand(commandWithoutPipe);  // Reattach the pipe after processing
    } else {
      return this.replaceCommand(cmd);  // Regular replacement
    }
  });
  return commands.join(' ');
},

replaceCommand(command) {
  // Replace commands based on the map
  switch (command) {
    // case ':bajo:':
    //   return '🎸';
    case '1n':
      return '𝅝';
    case '2n':
      return '𝅗𝅥';
    case '4n':
      return '𝅘𝅥';
    case '8n':
      return '𝅘𝅥𝅮';
    case 'n8n8':
      return '♫';
    case '16n':
      return '𝅘𝅥𝅯';
    // silencios
    case '1s':
      return '𝄻';
    case '2s':
      return '𝄼';
    case '4s':
      return '𝄽';
    case '8s':
      return '𝄾';
    case '16s':
      return '𝄿';
    default:
      return command;  // If no match, return the original command
  }
},
    
    evaluate(){
       try {
       var datosDelPrograma = parser.parse(this.docs[this.indiceDelDocumentoActivo].textEditor);
       // var datosDelPrograma = parser.parse(this.textEditor);
       p.programa(datosDelPrograma.estadoGlobal, datosDelPrograma.pistas);
       console.log(datosDelPrograma.pistas);
       // this.errorConsole = datosDelPrograma;
       this.errorConsole = "";

     } catch (error) {
       this.errorConsole = "Error:" + error.message;
  }
      
    },
    
//     expandir horizontalmente
    
  expandirPantallaHorizontalmente(){
    this.pantallaCompletaHorizontalmente = !this.pantallaCompletaHorizontalmente;
    console.log("pantallaCompletaHorizontalmente", this.pantallaCompletaHorizontalmente)

    if (this.pantallaCompletaHorizontalmente == false){
  
    console.log("normal")
      this.panelIzquierdoEstaVisible = true
      this.barraHorizontalSuperiorXpos= 343.5
      this.barraHorizontalSuperiorWidth= 1023.94 
      this.codeEditorImagenDeFondoXpos = 345.28 + this.anchoDelMenuDerecho
      this.codeEditorImagenDeFondoWidth = 1020.61
      this.codeEditorXpos = 343.5 + this.anchoDelMenuDerecho
      this.consoleXpos = 343.606 + this.anchoDelMenuDerecho
      this.consoleWidth = 1023.96
      this.editorDeTextoWidth = 1024 
    
      if (this.docs.length > 0) { 
      this.docs.forEach(doc => {
      doc.xDocTab = doc.xDocTab + (406.506 - this.anchoDelMenuDerecho);
        console.log("xCerrarDocIconoNormal", doc.xDocTab)      
      doc.xCerrarDocIcono =   doc.xDocTab + 140 // this.anchoDelDocTab; //doc.xCerrarDocIcono + (549.422 - this.anchoDelMenuDerecho) //doc.xCerrarDocIcono // + (549.422) ; 
      console.log( doc.xCerrarDocIcono)

    });
      let lastItem = this.docs.length - 1   
      this.initXPlusSsign = this.docs[lastItem].xDocTab + this.anchoDelDocTab //+ this.espacioPlusSignYtab;

      } else {
      this.initXPlusSsign =  575.524 - this.anchoDelDocTab
    }
      
      


      //   menu derecho
      this.menuDerechoXPos = 343.5
      // this.menuDerechoYPos = 136.5
      this.menuDerechoIconXPos= 348.002,
      // this.menuDerechoIconYPos=  145,
        
      this.menuDerechoTransform = "translate(348.002 137.373)"
      this.barraVerticalMenuDerechoXPos= 343.5 // 406.507 
      // this.barraVerticalMenuDerechoYPos= 200.432
      // this.barraVerticalRotation= "rotate(90 406.507 200.432)"
      this.iconosMenuDerechoXpos= 360
      this.menuDerechoMenuIcon= 14.6123




    } else {
      console.log("completa")
      this.panelIzquierdoEstaVisible = false
      this.barraHorizontalSuperiorXpos= 0 
      this.barraHorizontalSuperiorWidth= 1368 
      this.codeEditorImagenDeFondoXpos = -0.432373 + this.anchoDelMenuDerecho
      this.codeEditorImagenDeFondoWidth = 1368 - this.anchoDelMenuDerecho

      this.codeEditorXpos =  -0.432373 + this.anchoDelMenuDerecho
      this.consoleXpos = -0.432373 + this.anchoDelMenuDerecho
      this.consoleWidth = 1368 - this.anchoDelMenuDerecho

      this.editorDeTextoWidth = 1368 - this.anchoDelMenuDerecho 

      
      if (this.docs.length > 0) {    
      this.docs.forEach(doc => {
          doc.xDocTab = doc.xDocTab - (406.506 - this.anchoDelMenuDerecho); // = doc.xDocTab = 62
        console.log("doctabx",  doc.xDocTab)
          doc.xCerrarDocIcono =  doc.xDocTab  +  140 // this.anchoDelDocTab;//- (549.422 - this.anchoDelMenuDerecho) 
          console.log( "xCerrarDocIconoCompleta", doc.xCerrarDocIcono)
        });
          let lastItem = this.docs.length - 1 
        this.initXPlusSsign = this.docs[lastItem].xDocTab + this.anchoDelDocTab //+ this.espacioPlusSignYtab;

      } else {
        this.initXPlusSsign = 62.5962
    }
      
  
    

        
      
      // (205.51 - this.anchoDelMenuDerecho) // doc.xCerrarDocIcono - 406.506 //- (549.422 - this.anchoDelMenuDerecho) + this.anchoDelDocTab - 20; 

      
     
         //   menu derecho
      this.menuDerechoXPos = 0
      // this.menuDerechoYPos = 136.5
      this.menuDerechoIconXPos= 6,
      // this.menuDerechoIconYPos=  145,
      this.menuDerechoTransform = "translate(20 137.373)"
      this.barraVerticalMenuDerechoXPos= 0 // 62.5962
      // this.barraVerticalMenuDerechoYPos=  200.432
      // this.barraVerticalRotation= "rotate(90 62.5962 200.432)"
      this.iconosMenuDerechoXpos= 15
      this.menuDerechoMenuIcon= -0.432373
      
// svg container width = 1368
    }
  },
    
//     expandir verticalmente
    expandirPantallaVerticalmente() {
    this.pantallaCompletaVerticalmente = !this.pantallaCompletaVerticalmente;
    if (this.pantallaCompletaVerticalmente == false){
  
    console.log("normal")
      this.mostrarBarraHorizontalSuperiorTituloYBanner = true
      this.barraHorizontalSuperiorYpos= 135.379
      this.barraHorizontalSuperiorHeight= 64.0886 
      this.yPlusSsign= 135.344
      this.yDocTab= 135.347
      this.yCerrarDocIcono= 125

      
//       editor
      this.codeEditorImagenDeFondoYpos= 200.828
      this.codeEditorImagenDeFondoHeight = 337.76
      this.codeEditorYpos = 200.828
      this.editorDeTextoHeight =  336//1024 
      this.consoleYpos = 536.918
      
      
      //   menu derecho
      // this.menuDerechoXPos = 343.5
      this.menuDerechoYPos = 136.5
      // this.menuDerechoIconXPos: 348.002,
      this.menuDerechoIconYPos=  145,
      this.menuDerechoTransform = "translate(348.002 137.373)"
      // this.barraVerticalMenuDerechoXPos= 406.507 
      this.barraVerticalMenuDerechoYPos= 200.432
      // this.barraVerticalRotation= "rotate(90 406.507 200.432)"
      this.expandRightCircleIconYpos= 560
      this.expandUpCircleIconYpos= 510
      this.imagenDeFondoIconYpos= 460
      this.folderOpenIconYpos= 410
      this.saveIconYpos= 360
      this.ajustarTamanoIconYpos= 310
      this.stopIconYpos = 260
      this.playIconYpos = 210
      
      //       panel izquierdo
      this.barraHorizontalTituloIzquierdoYpos= 136.553
      this.tituloPanelIzquierdoYpos= 181.291
      this.opcionesMenuIzquierdoYpos= 145.834
      this.abrirMenuIzquierdoYpos= 136.5
      this.contendoresPanelIzquierdoYpos= 199.5
      this.saludosEditorYpos= 225
      this.publicarSaludosCheckboxContainerYpos= 484.5
      this.publicarSaludosCheckboxIconYpos= 490
      this.publicarSaludosCheckboxYpos= 487   
      this.seleccionarVozContainerYpos= 484.5
      this.seleccionarVozIconYpos= 490 
      this.seleccionarVozDropdownYpos= 490
      this.botonEnviarSaludoContainer= 484.5
      this.botonEnviarSaludoIcon= 490, 
      this.translatePanelSaludos= "translate(0 0)"
      
    } else {
      console.log("completa")
      this.mostrarBarraHorizontalSuperiorTituloYBanner = false
      this.barraHorizontalSuperiorYpos= 0 
      this.barraHorizontalSuperiorHeight= 64.0886  // + 135.053  height of barra superior with title and banner
      this.yPlusSsign= 0
      this.yDocTab= 0 
      this.yCerrarDocIcono= -10

//       editor
      this.codeEditorImagenDeFondoYpos= 64.0886 // barraHorizontalSuperiorHeight
      this.codeEditorImagenDeFondoHeight = 337.76 + 135.053

      this.codeEditorYpos =  64.0886 // barraHorizontalSuperiorHeight
      this.editorDeTextoHeight = 336 + 135.053
      this.consoleYpos = 536.918 + 336 // height del editor de texto
     
      //   menu derecho
         // this.menuDerechoXPos = 343.5
      this.menuDerechoYPos = 0
      // this.menuDerechoIconXPos: 348.002,
      this.menuDerechoIconYPos=  6,
      this.menuDerechoTransform = "translate(343.5 0)"
      // this.barraVerticalMenuDerechoXPos= 406.507 - 135.053 // height of barra superior with title and banner
      this.barraVerticalMenuDerechoYPos= 200.432 - 135.053
      // this.barraVerticalRotation= "rotate(90 0 200.432)"
      this.expandRightCircleIconYpos= 560 - 135.053 // height of barra superior with title and banner
      this.expandUpCircleIconYpos= 510 - 135.053 // height of barra superior with title and banner
      this.imagenDeFondoIconYpos= 460 - 135.053 // height of barra superior with title and banner
      this.folderOpenIconYpos= 410 - 135.053 // height of barra superior with title and banner
      this.saveIconYpos= 360 - 135.053 // height of barra superior with title and banner
      this.ajustarTamanoIconYpos= 310 - 135.053 // height of barra superior with title and banner
      this.stopIconYpos = 260 - 135.053 // height of barra superior with title and banner
      this.playIconYpos = 210 - 135.053 // height of barra superior with title and banner
      
 //       panel izquierdo
      this.barraHorizontalTituloIzquierdoYpos= 0
      this.tituloPanelIzquierdoYpos= 181.291 - 135.053 // height of barra superior with title and banner
      this.opcionesMenuIzquierdoYpos= 145.834 - 135.053 // height of barra superior with title and banner
      this.abrirMenuIzquierdoYpos= 136.5 - 135.053 // height of barra superior with title and banner
      this.contendoresPanelIzquierdoYpos= 199.5 - 135.053 // height of barra superior with title and banner
      this.saludosEditorYpos= 225 - 135.053 // height of barra superior with title and banner
      this.publicarSaludosCheckboxContainerYpos= 484.5 - 135.053 // height of barra superior with title and banner
      this.publicarSaludosCheckboxIconYpos= 490 - 135.053 // height of barra superior with title and banner
      this.publicarSaludosCheckboxYpos= 487  - 135.053 // height of barra superior with title and banner  
      this.seleccionarVozContainerYpos= 484.5 - 135.053 // height of barra superior with title and banner
      this.seleccionarVozIconYpos= 490 - 135.053 // height of barra superior with title and banner 
      this.seleccionarVozDropdownYpos= 490 - 135.053 // height of barra superior with title and banner
      this.botonEnviarSaludoContainer= 484.5 - 135.053 // height of barra superior with title and banner
      this.botonEnviarSaludoIcon= 490 - 135.053 // height of barra superior with title and banner     
      this.translatePanelSaludos= "translate(0 -140)"

    }

  },
//     
  }
});


app.mount("#app");

 