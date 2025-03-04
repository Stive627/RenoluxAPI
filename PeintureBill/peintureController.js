const pdfDocument = require('pdfkit')
const PeintureModel = require('./peintureBill')

const peintureDevis = async(req, res) => {
    const {
        title, surface, pots_enduit_prix,
        pots_enduit_qte, pots_impression_prix,
        pots_impression_qte,
        sceau_peinture_prix, sceau_peinture_qte,
        sac_ciment_qte, sac_ciment_prix, price
        } 
        = req.body

    const [day, number, month, year] = new Intl.DateTimeFormat('fr-CM', {'dateStyle':'full'}).format(new Date()).split(' ')
    const num = number.length === 1 ? '0'+ number : number
    const randomDoc = Math.floor(Math.random()* 10000)
    const doc = new pdfDocument()
    doc.font('Times-Roman')
    doc.pipe(fs.createWriteStream('public/devis/placo' + String(randomDoc) + '.pdf'))
    doc.image('public/devis/logo_renolux_cameroun.png',15  , 10, {scale:0.55})
    doc.fontSize(18).text(day, 350, 60)
    doc.fontSize(18).text(', ' +  String(num) +  month, 395, 60,{underline:true})
    doc.fontSize(18).text(year, 495, 60)
    doc.font('Times-Bold').fontSize(18).text('Entreprise: ', 28, 152)
    doc.fontSize(16).font('Times-Roman').text('RENOLUX CAMEROON', 125, 154)
    doc.font('Times-Bold').fontSize(18).text('Localisation: ', 28, 177)
    doc.fontSize(16).font('Times-Roman').text('Yaounde, CAMEROON', 137, 179)
    doc.font('Times-Bold').fontSize(18).text('Tel : ', 28, 202)
    doc.fontSize(16).font('Times-Roman').text('+237 691098037', 77, 204)
    doc.font('Times-Bold').fontSize(18).text('Mail : ', 28, 227)
    doc.fontSize(16).font('Times-Roman').text('renolux3@gmail.com', 83, 227)
    doc.font('Times-Bold').fontSize(18).text('Site web : ', 28, 249)
    doc.fontSize(16).font('Times-Roman').text('https://renolux.netlify.app', 113, 249)

    doc.lineCap('')
        .roundedRect(15, 135, 300, 140, 12)
        .stroke()
    doc.moveDown(2)
    doc.font('Times-Bold').fontSize(21) .text(title, {underline:true, align:'center'})   
    doc.moveDown(2)
    doc.lineCap('')
    .rect(23, 336, 580, 30).stroke()
    doc.font('Times-Bold').fontSize(14).fillColor('black') 
    .text('Surface', 30, 341)
    doc.lineCap('')
    .rect(115, 336, 110, 30).stroke()
    doc.font('Times-Bold').fontSize(14).fillColor('black') 
    .text("Pots d'enduits", 120, 341)
    doc.font('Times-Bold').fontSize(14).fillColor('black') 
    .text("Pots d'impression", 228, 341)
    doc.lineCap('')
    .rect(345, 336, 120, 30).stroke()
    doc.font('Times-Bold').fontSize(14).fillColor('black') 
    .text("Pots de peinture", 354, 341).stroke()
    doc.font('Times-Bold').fontSize(14).fillColor('black') 
    .text("Ciment(sac)", 465, 341).stroke()
    doc.lineCap('')
    .rect(23, 366, 580, 30).stroke()
    doc.font('Times-Roman').fontSize(16).fillColor('black') 
    .text(surface, 30, 371)
    doc.lineCap('')
    .rect(115, 366, 110, 30).stroke()
    doc.font('Times-Roman').fontSize(16).fillColor('black') 
    .text(pots_enduit_qte, 120, 371)
    doc.font('Times-Roman').fontSize(16).fillColor('black') 
    .text(pots_impression_qte, 228, 371)
    doc.lineCap('')
    .rect(345, 366, 120, 30).stroke()
    doc.font('Times-Roman').fontSize(16).fillColor('black') 
    .text(sceau_peinture_qte, 364, 371)
    doc.font('Times-Bold').fontSize(14).fillColor('black') 
    .text(sac_ciment_qte, 475, 371).stroke()
    doc.font('Times-Roman').text(`Le mètre carré de la main-d’œuvre sera facturé à raison de ${price}F/m2 ce qui fait un total de ${(surface * price).toFixed(2)}FCFA.`, 18, 420)
   doc.end()
   const newDevisPeinture = new PeintureModel(req.body)
   await newDevisPeinture.save()
   .then(()=> res.status(200).send('The peinture devis is generated.'))
   .catch((reason)=>res.status(400).send(reason))
    
}

module.exports = {peintureDevis}