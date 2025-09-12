// ULTRA INTELLIGENT REAL-TIME WRITING CORRECTOR
// This is a THINKING AI that understands context and corrects intelligently

class IntelligentWritingCorrector {
    constructor() {
        this.currentLanguage = null;
        this.context = {
            previousWords: [],
            currentSentence: '',
            previousSentences: [],
            topic: null,
            writingStyle: 'neutral'
        };
        
        // Neural-like pattern matching for context understanding
        this.patterns = {
            greetings: {
                spanish: ['hola', 'buenos días', 'buenas tardes', 'qué tal', 'cómo estás'],
                english: ['hello', 'hi', 'good morning', 'how are you', 'hey']
            },
            techTerms: ['api', 'javascript', 'html', 'css', 'react', 'node', 'npm', 'git'],
            businessTerms: ['meeting', 'deadline', 'project', 'client', 'proposal']
        };
        
        // Context-aware corrections database
        this.corrections = {
            contextual: [
                {
                    pattern: /\bola\b/i,
                    analyze: (context) => {
                        // If talking in Spanish context, "ola" should be "hola"
                        if (this.isSpanishContext(context)) {
                            return { correction: 'hola', confidence: 0.95, reason: 'Spanish greeting' };
                        }
                        // If talking about water/waves in English, might be "wave"
                        if (this.isWaterContext(context)) {
                            return { correction: 'wave', confidence: 0.7, reason: 'English - water context' };
                        }
                        // Default to Spanish greeting
                        return { correction: 'hola', confidence: 0.8, reason: 'Likely Spanish greeting' };
                    }
                },
                {
                    pattern: /\bk\b/i,
                    analyze: (context) => {
                        // "k" alone is almost always "que" in Spanish
                        return { correction: 'que', confidence: 0.95, reason: 'Spanish - que' };
                    }
                },
                {
                    pattern: /\bcoomo\b/i,
                    analyze: (context) => {
                        return { correction: 'cómo', confidence: 0.95, reason: 'Spanish - typo + accent' };
                    }
                },
                {
                    pattern: /\bcom\b/i,
                    analyze: (context) => {
                        // "com" could be "con" or "como"
                        if (context.nextWord && ['le', 'la', 'el', 'mi', 'tu', 'su'].includes(context.nextWord.toLowerCase())) {
                            return { correction: 'con', confidence: 0.9, reason: 'Spanish - con (with)' };
                        }
                        return { correction: 'como', confidence: 0.7, reason: 'Spanish - como' };
                    }
                },
                {
                    pattern: /\bvid\b/i,
                    analyze: (context) => {
                        // "vid" alone could be a typo for "vi" (I saw)
                        if (context.previousWord && ['yo', 'ya', 'ayer'].includes(context.previousWord.toLowerCase())) {
                            return { correction: 'vi', confidence: 0.8, reason: 'Spanish - vi (I saw)' };
                        }
                        return null;
                    }
                },
                {
                    pattern: /\bcommentame\b/i,
                    analyze: (context) => {
                        return { correction: 'coméntame', confidence: 0.95, reason: 'Spanish - coméntame' };
                    }
                },
                {
                    pattern: /\bq\b/i,
                    analyze: (context) => {
                        // "q" is almost always "que" in Spanish
                        return { correction: 'que', confidence: 0.95, reason: 'Spanish - que abbreviation' };
                    }
                },
                {
                    pattern: /\bxq\b/i,
                    analyze: (context) => {
                        return { correction: 'porque', confidence: 0.95, reason: 'Spanish - porque abbreviation' };
                    }
                },
                {
                    pattern: /\btq\b/i,
                    analyze: (context) => {
                        return { correction: 'te quiero', confidence: 0.9, reason: 'Spanish - te quiero abbreviation' };
                    }
                },
                {
                    pattern: /\baver\b/i,
                    analyze: (context) => {
                        return { correction: 'a ver', confidence: 0.95, reason: 'Spanish - common mistake' };
                    }
                },
                {
                    pattern: /\bhaver\b/i,
                    analyze: (context) => {
                        return { correction: 'haber', confidence: 0.95, reason: 'Spanish - spelling' };
                    }
                },
                {
                    pattern: /\bai\b/i,
                    analyze: (context) => {
                        if (this.isSpanishContext(context)) {
                            return { correction: 'ahí', confidence: 0.8, reason: 'Spanish - location' };
                        }
                        return { correction: 'AI', confidence: 0.7, reason: 'English - Artificial Intelligence' };
                    }
                }
            ],
            
            // Smart accent detection for Spanish
            accentRules: [
                { word: 'mas', correct: 'más', context: 'comparison' },
                { word: 'si', correct: 'sí', context: 'affirmation' },
                { word: 'tu', correct: 'tú', context: 'pronoun' },
                { word: 'el', correct: 'él', context: 'pronoun' },
                { word: 'mi', correct: 'mí', context: 'pronoun_prep' },
                { word: 'te', correct: 'té', context: 'noun' },
                { word: 'se', correct: 'sé', context: 'verb' },
                { word: 'de', correct: 'dé', context: 'verb' },
                { word: 'esta', correct: 'está', context: 'verb' },
                { word: 'como', correct: 'cómo', context: 'question' },
                { word: 'cuando', correct: 'cuándo', context: 'question' },
                { word: 'donde', correct: 'dónde', context: 'question' },
                { word: 'que', correct: 'qué', context: 'question' },
                { word: 'quien', correct: 'quién', context: 'question' },
                { word: 'porque', correct: 'por qué', context: 'question' }
            ],
            
            // Extensive typos and corrections database
            typos: {
                // English common mistakes
                'teh': 'the',
                'recieve': 'receive',
                'occured': 'occurred',
                'untill': 'until',
                'wich': 'which',
                'alot': 'a lot',
                'definately': 'definitely',
                'seperate': 'separate',
                'occassion': 'occasion',
                'concious': 'conscious',
                'excercise': 'exercise',
                'independant': 'independent',
                'arguement': 'argument',
                'beleive': 'believe',
                'collegue': 'colleague',
                'comming': 'coming',
                'dissapear': 'disappear',
                'enviroment': 'environment',
                'existance': 'existence',
                'foriegn': 'foreign',
                'goverment': 'government',
                'grammer': 'grammar',
                'harrass': 'harass',
                'immediatly': 'immediately',
                'jewelery': 'jewelry',
                'knowlege': 'knowledge',
                'lisence': 'license',
                'maintainance': 'maintenance',
                'necesary': 'necessary',
                'noticable': 'noticeable',
                'occurence': 'occurrence',
                'peice': 'piece',
                'perseverence': 'perseverance',
                'questionaire': 'questionnaire',
                'refered': 'referred',
                'rythm': 'rhythm',
                'succesful': 'successful',
                'tommorow': 'tomorrow',
                'unfortunatly': 'unfortunately',
                'wierd': 'weird',
                
                // Spanish - EXTENSIVE list
                'porfavor': 'por favor',
                'enserio': 'en serio',
                'osea': 'o sea',
                'derrepente': 'de repente',
                'atravez': 'a través',
                'alomejor': 'a lo mejor',
                'apartir': 'a partir',
                'depronto': 'de pronto',
                'sobretodo': 'sobre todo',
                'asimismo': 'así mismo',
                'aveces': 'a veces',
                'ahi': 'ahí',
                'hai': 'hay',
                'alla': 'allá',
                'halla': 'haya',
                'valla': 'vaya',
                'iva': 'iba',
                'llendo': 'yendo',
                'nadien': 'nadie',
                'ningun': 'ningún',
                'algun': 'algún',
                'tambien': 'también',
                'ademas': 'además',
                'quizas': 'quizás',
                'despues': 'después',
                'atras': 'atrás',
                'adelante': 'adelante',
                'afuera': 'afuera',
                'adentro': 'adentro',
                'arriba': 'arriba',
                'abajo': 'abajo',
                'aqui': 'aquí',
                'aca': 'acá',
                'asi': 'así',
                'alla': 'allá',
                'ayer': 'ayer',
                'hoy': 'hoy',
                'mañana': 'mañana',
                'siempre': 'siempre',
                'jamas': 'jamás',
                'quiza': 'quizá',
                'ojala': 'ojalá',
                'todavia': 'todavía',
                'aun': 'aún',
                'recien': 'recién',
                'tambien': 'también',
                'tampoco': 'tampoco',
                'dificil': 'difícil',
                'facil': 'fácil',
                'util': 'útil',
                'inutil': 'inútil',
                'debil': 'débil',
                'fragil': 'frágil',
                'agil': 'ágil',
                'habil': 'hábil',
                'movil': 'móvil',
                'automovil': 'automóvil',
                'arbol': 'árbol',
                'angel': 'ángel',
                'carcel': 'cárcel',
                'crater': 'cráter',
                'tunel': 'túnel',
                'marmol': 'mármol',
                'azucar': 'azúcar',
                'cesar': 'césar',
                'nectar': 'néctar',
                'ambar': 'ámbar',
                'album': 'álbum',
                'regimen': 'régimen',
                'volumen': 'volumen',
                'origen': 'origen',
                'margen': 'margen',
                'imagen': 'imagen',
                'orden': 'orden',
                'desorden': 'desorden',
                'examen': 'examen',
                'resumen': 'resumen',
                'abdomen': 'abdomen',
                'cafe': 'café',
                'sofa': 'sofá',
                'mama': 'mamá',
                'papa': 'papá',
                'bebe': 'bebé',
                'Jose': 'José',
                'Maria': 'María',
                'Jesus': 'Jesús',
                'Andres': 'Andrés',
                'Ramon': 'Ramón',
                'Adrian': 'Adrián',
                'Sebastian': 'Sebastián',
                'Nicolas': 'Nicolás',
                'Cristian': 'Cristián',
                'German': 'Germán',
                'Julian': 'Julián',
                'Fabian': 'Fabián',
                'Ivan': 'Iván',
                'Ruben': 'Rubén',
                'corazon': 'corazón',
                'razon': 'razón',
                'estacion': 'estación',
                'cancion': 'canción',
                'oracion': 'oración',
                'nacion': 'nación',
                'emocion': 'emoción',
                'pasion': 'pasión',
                'mision': 'misión',
                'vision': 'visión',
                'decision': 'decisión',
                'precision': 'precisión',
                'ocasion': 'ocasión',
                'profesion': 'profesión',
                'comprension': 'comprensión',
                'expresion': 'expresión',
                'impresion': 'impresión',
                'depresion': 'depresión',
                'agresion': 'agresión',
                'posesion': 'posesión',
                'dimension': 'dimensión',
                'extension': 'extensión',
                'pension': 'pensión',
                'presion': 'presión',
                'tension': 'tensión',
                'atencion': 'atención',
                'intencion': 'intención',
                'prevencion': 'prevención',
                'retencion': 'retención',
                'detencion': 'detención',
                'obtencion': 'obtención',
                'abstencion': 'abstención',
                'manutencion': 'manutención',
                'intervencion': 'intervención',
                'convencion': 'convención',
                'invencion': 'invención',
                'direccion': 'dirección',
                'proteccion': 'protección',
                'perfeccion': 'perfección',
                'infeccion': 'infección',
                'eleccion': 'elección',
                'seleccion': 'selección',
                'coleccion': 'colección',
                'correccion': 'corrección',
                'resurreccion': 'resurrección',
                'produccion': 'producción',
                'reduccion': 'reducción',
                'introduccion': 'introducción',
                'conduccion': 'conducción',
                'traduccion': 'traducción',
                'seduccion': 'seducción',
                'destruccion': 'destrucción',
                'construccion': 'construcción',
                'instruccion': 'instrucción',
                'reconstruccion': 'reconstrucción',
                'obstruccion': 'obstrucción',
                'constitucion': 'constitución',
                'institucion': 'institución',
                'restitucion': 'restitución',
                'prostitucion': 'prostitución',
                'sustitucion': 'sustitución',
                'disolucion': 'disolución',
                'resolucion': 'resolución',
                'absolucion': 'absolución',
                'evolucion': 'evolución',
                'revolucion': 'revolución',
                'devolucion': 'devolución',
                'involucion': 'involución',
                'solucion': 'solución',
                'polucion': 'polución',
                'confusion': 'confusión',
                'difusion': 'difusión',
                'fusion': 'fusión',
                'ilusion': 'ilusión',
                'alusion': 'alusión',
                'conclusion': 'conclusión',
                'inclusion': 'inclusión',
                'exclusion': 'exclusión',
                'reclusion': 'reclusión',
                'preclusion': 'preclusión',
                'explosion': 'explosión',
                'implosion': 'implosión',
                
                // Spanish internet slang and abbreviations
                'xq': 'porque',
                'xk': 'porque',
                'pk': 'porque',
                'pq': 'porque',
                'tmb': 'también',
                'tb': 'también',
                'tbn': 'también',
                'bn': 'bien',
                'bno': 'bueno',
                'grax': 'gracias',
                'grcias': 'gracias',
                'plis': 'por favor',
                'xfa': 'por favor',
                'dnd': 'donde',
                'dnde': 'dónde',
                'kiero': 'quiero',
                'kero': 'quiero',
                'kieres': 'quieres',
                'qdo': 'cuando',
                'cdo': 'cuando',
                'tngo': 'tengo',
                'tgo': 'tengo',
                'sta': 'está',
                'stas': 'estás',
                'stoy': 'estoy',
                'toi': 'estoy',
                'toy': 'estoy',
                'voi': 'voy',
                'boi': 'voy',
                'ber': 'ver',
                'beo': 'veo',
                'bes': 'ves',
                'acer': 'hacer',
                'aser': 'hacer',
                'ago': 'hago',
                'aces': 'haces',
                'ace': 'hace',
                'ablo': 'hablo',
                'ablas': 'hablas',
                'dise': 'dice',
                'disen': 'dicen',
                'kien': 'quien',
                'kn': 'quien',
                'qn': 'quien',
                'ke': 'que',
                'ktal': 'qué tal',
                'qtal': 'qué tal',
                'kase': 'qué hace',
                'kases': 'qué haces',
                'estoi': 'estoy',
                'mui': 'muy',
                'vien': 'bien',
                'saves': 'sabes',
                'save': 'sabe',
                'saver': 'saber',
                'tuvo': 'tuvo',
                'tuvieron': 'tuvieron',
                'uvieron': 'hubieron',
                'uvo': 'hubo',
                'ise': 'hice',
                'iso': 'hizo',
                'echo': 'hecho',
                'emos': 'hemos',
                'aver': 'a ver',
                'haver': 'haber',
                'vien': 'bien',
                'vendras': 'vendrás',
                'vendra': 'vendrá',
                'iras': 'irás',
                'ira': 'irá',
                'podra': 'podrá',
                'podras': 'podrás',
                'tendra': 'tendrá',
                'tendras': 'tendrás',
                'sabra': 'sabrá',
                'sabras': 'sabrás',
                'habra': 'habrá',
                'habras': 'habrás',
                'sera': 'será',
                'seras': 'serás',
                'estara': 'estará',
                'estaras': 'estarás',
                'dia': 'día',
                'dias': 'días',
                'todavia': 'todavía',
                'tambien': 'también',
                'ademas': 'además',
                'quizas': 'quizás',
                'despues': 'después',
                'atras': 'atrás',
                'aqui': 'aquí',
                'ahi': 'ahí',
                'alla': 'allá',
                'asi': 'así',
                'facil': 'fácil',
                'dificil': 'difícil',
                'util': 'útil',
                'inutil': 'inútil',
                'debil': 'débil',
                'movil': 'móvil',
                'arbol': 'árbol',
                'angel': 'ángel',
                'tunel': 'túnel',
                'azucar': 'azúcar',
                'cafe': 'café',
                'sofa': 'sofá',
                'mama': 'mamá',
                'papa': 'papá',
                'bebe': 'bebé'
            }
        };
        
        this.lastCorrection = null;
        this.correctionConfidence = 0;
    }
    
    // MAIN INTELLIGENCE: Analyze and correct text in real-time
    async analyzeAndCorrect(text, cursorPosition) {
        // Handle empty text
        if (!text || text.trim().length === 0) {
            return {
                correctedText: text,
                corrections: [],
                language: this.currentLanguage || 'spanish',
                confidence: 1.0
            };
        }
        
        // Smart word splitting that preserves punctuation
        const wordPattern = /[\wáéíóúñÁÉÍÓÚÑ]+|[.,;:!?¿¡]/g;
        const words = text.match(wordPattern) || [];
        const spaces = text.split(wordPattern);
        
        const currentWord = this.getCurrentWord(text, cursorPosition);
        const corrections = [];
        
        // Detect language based on context
        this.detectLanguage(text);
        
        // Update context
        this.updateContext(text);
        
        // Analyze each word with context
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            
            // Skip punctuation
            if (/^[.,;:!?¿¡]$/.test(word)) continue;
            
            const wordContext = {
                previousWord: words[i - 1] || '',
                nextWord: words[i + 1] || '',
                sentence: this.getCurrentSentence(text, word),
                isQuestion: this.isQuestion(text),
                position: i
            };
            
            // Check for contextual corrections
            const correction = this.getIntelligentCorrection(word, wordContext);
            
            if (correction && correction.confidence > 0.6) {
                // Find the actual position in the original text
                const wordPosition = text.indexOf(word);
                
                corrections.push({
                    original: word,
                    corrected: correction.correction,
                    position: wordPosition,
                    confidence: correction.confidence,
                    reason: correction.reason
                });
                
                // Apply correction to the word
                words[i] = correction.correction;
            }
        }
        
        // Reconstruct text with corrections, preserving spacing
        let correctedText = '';
        let wordIndex = 0;
        for (let i = 0; i < spaces.length; i++) {
            correctedText += spaces[i];
            if (wordIndex < words.length) {
                correctedText += words[wordIndex];
                wordIndex++;
            }
        }
        
        // Add Spanish question marks if missing
        if (this.currentLanguage === 'spanish' && correctedText.includes('?') && !correctedText.includes('¿')) {
            // Find question start
            const questionEnd = correctedText.indexOf('?');
            if (questionEnd > 0) {
                // Find where the question likely starts
                const beforeQuestion = correctedText.substring(0, questionEnd);
                const sentenceStart = Math.max(
                    beforeQuestion.lastIndexOf('.') + 1,
                    beforeQuestion.lastIndexOf('!') + 1,
                    beforeQuestion.lastIndexOf('?') + 1,
                    0
                );
                
                // Insert opening question mark
                correctedText = correctedText.substring(0, sentenceStart).trim() + ' ¿' + 
                               correctedText.substring(sentenceStart).trim();
            }
        }
        
        // Return corrected text and corrections list
        return {
            correctedText: correctedText,
            corrections: corrections,
            language: this.currentLanguage,
            confidence: this.calculateOverallConfidence(corrections)
        };
    }
    
    // Get intelligent correction based on context
    getIntelligentCorrection(word, context) {
        let bestCorrection = null;
        let highestConfidence = 0;
        
        // Check contextual patterns
        for (const rule of this.corrections.contextual) {
            if (rule.pattern.test(word)) {
                const result = rule.analyze(context);
                if (result && result.confidence > highestConfidence) {
                    bestCorrection = result;
                    highestConfidence = result.confidence;
                }
            }
        }
        
        // Check for typos
        const lowerWord = word.toLowerCase();
        if (this.corrections.typos[lowerWord]) {
            const typoCorrection = {
                correction: this.corrections.typos[lowerWord],
                confidence: 0.9,
                reason: 'Common typo'
            };
            
            if (typoCorrection.confidence > highestConfidence) {
                bestCorrection = typoCorrection;
                highestConfidence = typoCorrection.confidence;
            }
        }
        
        // Check for accent corrections (Spanish)
        if (this.currentLanguage === 'spanish') {
            const accentCorrection = this.checkAccents(word, context);
            if (accentCorrection && accentCorrection.confidence > highestConfidence) {
                bestCorrection = accentCorrection;
            }
        }
        
        return bestCorrection;
    }
    
    // Check if word needs accents based on context
    checkAccents(word, context) {
        const lowerWord = word.toLowerCase();
        
        for (const rule of this.corrections.accentRules) {
            if (rule.word === lowerWord) {
                // Analyze context to determine if accent is needed
                const needsAccent = this.analyzeAccentContext(word, rule, context);
                
                if (needsAccent) {
                    return {
                        correction: rule.correct,
                        confidence: needsAccent.confidence,
                        reason: `Spanish accent - ${rule.context}`
                    };
                }
            }
        }
        
        return null;
    }
    
    // Intelligent accent context analysis
    analyzeAccentContext(word, rule, context) {
        // Question words need accents when they're actually questions
        if (rule.context === 'question') {
            if (context.isQuestion || context.previousWord === '¿') {
                return { confidence: 0.95 };
            }
            return null;
        }
        
        // "más" needs accent when it means "more"
        if (rule.word === 'mas') {
            // Check if it's being used as "but" (no accent) or "more" (accent)
            if (context.previousWord && ['pero', 'sino'].includes(context.previousWord.toLowerCase())) {
                return null; // It means "but", no accent
            }
            return { confidence: 0.85 }; // Likely means "more"
        }
        
        // "sí" needs accent when it's affirmation
        if (rule.word === 'si') {
            // Check if it's conditional "if" or affirmation "yes"
            if (context.nextWord && ['entonces', 'no', 'quieres'].includes(context.nextWord.toLowerCase())) {
                return null; // Conditional "if"
            }
            if (context.previousWord === ',' || context.previousWord === '.') {
                return { confidence: 0.9 }; // Likely "yes"
            }
        }
        
        // "tú" needs accent when it's the pronoun
        if (rule.word === 'tu') {
            // Check if it's possessive "tu" or pronoun "tú"
            if (context.nextWord && this.isNoun(context.nextWord)) {
                return null; // Possessive, no accent
            }
            if (['eres', 'tienes', 'puedes', 'quieres'].includes(context.nextWord?.toLowerCase())) {
                return { confidence: 0.95 }; // Pronoun before verb
            }
        }
        
        // "está" needs accent when it's the verb
        if (rule.word === 'esta') {
            if (['bien', 'mal', 'aquí', 'allí'].includes(context.nextWord?.toLowerCase())) {
                return { confidence: 0.95 }; // Verb "estar"
            }
            if (this.isNoun(context.nextWord)) {
                return null; // Demonstrative, no accent
            }
        }
        
        return { confidence: 0.7 }; // Default confidence for other cases
    }
    
    // Detect if current context is Spanish
    isSpanishContext(context) {
        const spanishIndicators = [
            'hola', 'que', 'como', 'estas', 'gracias', 'por', 'favor',
            'bueno', 'bien', 'mal', 'si', 'no', 'cuando', 'donde',
            'porque', 'para', 'pero', 'muy', 'mucho', 'poco', 'todo'
        ];
        
        const text = this.context.currentSentence + ' ' + this.context.previousSentences.join(' ');
        const words = text.toLowerCase().split(/\s+/);
        
        let spanishCount = 0;
        for (const word of words) {
            if (spanishIndicators.includes(word)) {
                spanishCount++;
            }
        }
        
        return spanishCount > 2 || this.currentLanguage === 'spanish';
    }
    
    // Detect if context is about water/waves
    isWaterContext(context) {
        const waterWords = ['water', 'ocean', 'sea', 'beach', 'surf', 'swim', 'wave', 'tide'];
        const text = (this.context.currentSentence + ' ' + this.context.previousSentences.join(' ')).toLowerCase();
        
        return waterWords.some(word => text.includes(word));
    }
    
    // Detect if a word is likely a noun
    isNoun(word) {
        if (!word) return false;
        
        const commonNouns = [
            'casa', 'carro', 'trabajo', 'amigo', 'familia', 'tiempo',
            'día', 'noche', 'persona', 'lugar', 'cosa', 'manera',
            'house', 'car', 'work', 'friend', 'family', 'time',
            'day', 'night', 'person', 'place', 'thing', 'way'
        ];
        
        return commonNouns.includes(word.toLowerCase()) || 
               word[0] === word[0].toUpperCase(); // Capitalized words are often nouns
    }
    
    // Check if text is a question
    isQuestion(text) {
        return text.includes('?') || 
               text.includes('¿') ||
               /^(what|when|where|who|why|how|qué|cuándo|dónde|quién|por qué|cómo)/i.test(text.trim());
    }
    
    // Detect primary language of the text
    detectLanguage(text) {
        const spanishChars = (text.match(/[áéíóúñ¿¡]/g) || []).length;
        const spanishWords = (text.match(/\b(el|la|los|las|un|una|que|de|en|y|es|por|para|con|sin)\b/gi) || []).length;
        const englishWords = (text.match(/\b(the|is|are|was|were|been|have|has|had|do|does|did|will|would|could|should)\b/gi) || []).length;
        
        if (spanishChars > 0 || spanishWords > englishWords * 1.5) {
            this.currentLanguage = 'spanish';
        } else if (englishWords > spanishWords) {
            this.currentLanguage = 'english';
        } else {
            this.currentLanguage = 'mixed';
        }
        
        return this.currentLanguage;
    }
    
    // Get current word at cursor position
    getCurrentWord(text, position) {
        const before = text.substring(0, position);
        const after = text.substring(position);
        
        const wordBefore = before.match(/\S+$/);
        const wordAfter = after.match(/^\S+/);
        
        return (wordBefore ? wordBefore[0] : '') + (wordAfter ? wordAfter[0] : '');
    }
    
    // Get current sentence
    getCurrentSentence(text, word) {
        const sentences = text.split(/[.!?]/);
        for (const sentence of sentences) {
            if (sentence.includes(word)) {
                return sentence.trim();
            }
        }
        return sentences[sentences.length - 1] || '';
    }
    
    // Update context with new information
    updateContext(text) {
        const sentences = text.split(/[.!?]/).filter(s => s.trim());
        
        if (sentences.length > 0) {
            this.context.currentSentence = sentences[sentences.length - 1];
            this.context.previousSentences = sentences.slice(-3, -1);
        }
        
        const words = text.split(/\s+/);
        this.context.previousWords = words.slice(-10);
    }
    
    // Calculate overall confidence of corrections
    calculateOverallConfidence(corrections) {
        if (corrections.length === 0) return 1.0;
        
        const totalConfidence = corrections.reduce((sum, c) => sum + c.confidence, 0);
        return totalConfidence / corrections.length;
    }
    
    // Apply corrections to DOM element while preserving cursor PERFECTLY
    applyCorrectionsToElement(element, corrections) {
        // Save exact cursor position BEFORE any changes
        const selection = window.getSelection();
        if (!selection.rangeCount) return;
        
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        const caretOffset = preCaretRange.toString().length;
        
        // Also save the actual text content for reference
        const originalText = element.innerText || element.textContent || '';
        
        // Apply corrections to text (not HTML to avoid issues)
        let correctedText = originalText;
        let offsetAdjustment = 0;
        
        // Sort corrections by position to apply them in order
        const sortedCorrections = corrections.sort((a, b) => a.position - b.position);
        
        sortedCorrections.forEach(correction => {
            const beforeLength = correction.original.length;
            const afterLength = correction.corrected.length;
            const lengthDiff = afterLength - beforeLength;
            
            // Apply correction to text
            const regex = new RegExp(`\\b${correction.original}\\b`, 'i');
            correctedText = correctedText.replace(regex, correction.corrected);
            
            // Track how much the cursor position needs to adjust
            if (correction.position < caretOffset) {
                offsetAdjustment += lengthDiff;
            }
        });
        
        // Update element with corrected text (keeping it simple)
        element.textContent = correctedText;
        
        // Restore cursor to EXACTLY where it was (adjusted for corrections)
        try {
            const newCaretOffset = Math.min(caretOffset + offsetAdjustment, correctedText.length);
            const newRange = document.createRange();
            const newSelection = window.getSelection();
            
            // Use a tree walker to find the exact text node and offset
            let currentOffset = 0;
            let targetNode = null;
            let targetOffset = 0;
            
            const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
            );
            
            while (walker.nextNode()) {
                const node = walker.currentNode;
                const nodeLength = node.textContent.length;
                
                if (currentOffset + nodeLength >= newCaretOffset) {
                    targetNode = node;
                    targetOffset = newCaretOffset - currentOffset;
                    break;
                }
                currentOffset += nodeLength;
            }
            
            // If we found a text node, set cursor there
            if (targetNode) {
                newRange.setStart(targetNode, targetOffset);
                newRange.collapse(true);
            } else {
                // Fallback: place at the calculated position
                if (element.firstChild) {
                    newRange.setStart(element.firstChild, Math.min(newCaretOffset, element.firstChild.length || 0));
                    newRange.collapse(true);
                } else {
                    newRange.selectNodeContents(element);
                    newRange.collapse(false);
                }
            }
            
            newSelection.removeAllRanges();
            newSelection.addRange(newRange);
        } catch(e) {
            console.log('Cursor restoration error (but continuing):', e);
            // Even if cursor restoration fails, don't jump to beginning
            // Try to at least keep it at the end
            try {
                const endRange = document.createRange();
                endRange.selectNodeContents(element);
                endRange.collapse(false);
                selection.removeAllRanges();
                selection.addRange(endRange);
            } catch(e2) {
                // Silent fail - user can click to reposition
            }
        }
    }
}

// Export for use
window.IntelligentWritingCorrector = IntelligentWritingCorrector;