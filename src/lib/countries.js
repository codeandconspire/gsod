export function countries() {
  return format(parse(DATA))

  function parse(str) {
    const arr = []
    let quote = false
    for (let row = 0, col = 0, c = 0; c < str.length; c++) {
      let cc = str[c],
        nc = str[c + 1]
      arr[row] = arr[row] || []
      arr[row][col] = arr[row][col] || ''
      if (cc == '"' && quote && nc == '"') {
        arr[row][col] += cc
        ++c
        continue
      }
      if (cc == '"') {
        quote = !quote
        continue
      }
      if (cc == ',' && !quote) {
        ++col
        continue
      }
      if (cc == '\r' && nc == '\n' && !quote) {
        ++row
        col = 0
        ++c
        continue
      }
      if (cc == '\n' && !quote) {
        ++row
        col = 0
        continue
      }
      if (cc == '\r' && !quote) {
        ++row
        col = 0
        continue
      }
      arr[row][col] += cc
    }
    return arr
  }

  function format(data) {
    return data.map(function (item) {
      return {
        name: item[1],
        region: item[0],
        representation: {
          score: item[3],
          rank: item[4],
          change_1y: item[5],
          change_5y: item[6]
        },
        rights: {
          score: item[7],
          rank: item[8],
          change_1y: item[9],
          change_5y: item[10]
        },
        law: {
          score: item[11],
          rank: item[12],
          change_1y: item[13],
          change_5y: item[14]
        },
        participation: {
          score: item[15],
          rank: item[16],
          change_1y: item[17],
          change_5y: item[18]
        }
      }
    })
  }
}

const DATA = `Europe,Sweden,2022,0.887053643,1,0,3,0.887661808,7,1,0,0.8890914893,5,-2,0,0.7750676513,13,-7,-12
Europe,Denmark,2022,0.8853559811,2,1,4,0.9611269131,1,0,0,0.9804655897,1,7,1,0.9588935959,1,0,1
Europe,Estonia,2022,0.8827691986,3,3,-2,0.8227583449,18,0,1,0.8448386164,9,-2,-5,0.67575819,39,4,10
Americas,Chile,2022,0.8770621149,4,0,1,0.7323499478,32,7,5,0.7197396029,27,-1,-2,0.7233999766,28,2,25
Europe,Netherlands,2022,0.8698836097,5,5,3,0.8236029902,17,-2,-6,0.7697224714,18,-4,-7,0.727051992,26,-1,4
Europe,Germany,2022,0.8672354054,6,1,-4,0.9435756789,2,0,0,0.9124827519,3,-1,0,0.8067557725,10,3,4
Europe,Norway,2022,0.8641608959,7,4,7,0.9098810749,5,2,-2,0.9339193423,2,-1,-1,0.8905749253,5,-1,0
Europe,Finland,2022,0.8616823018,8,0,4,0.8880361271,7,-2,1,0.8648684222,6,0,6,0.9463190845,2,0,1
Americas,Uruguay,2022,0.859865192,9,-5,-2,0.7082474906,38,-3,-9,0.724554804,24,0,-6,0.8333169652,8,3,-2
Europe,Spain,2022,0.857437374,10,5,11,0.8316704229,15,-2,9,0.7477377698,22,1,-2,0.672404288,44,1,8
Europe,France,2022,0.8566707388,10,3,5,0.7557884714,27,-1,-10,0.7638179893,20,0,-1,0.7311624219,24,-7,8
Asia and the Pacific,New Zealand,2022,0.8560117824,12,0,-1,0.8433316353,13,3,2,0.843929246,10,1,-2,0.6843667978,36,-9,3
Americas,Costa Rica,2022,0.8541078042,13,-11,-4,0.8029577526,20,0,7,0.7243823138,25,0,1,0.7606050655,15,4,0
Europe,Italy,2022,0.8530530936,14,3,4,0.8379267697,14,0,-2,0.6512543741,35,0,1,0.8206998169,9,-1,0
Europe,Belgium,2022,0.8513768526,15,-1,-6,0.9126116979,4,2,1,0.8084710627,13,0,3,0.7989336021,11,1,2
Asia and the Pacific,Australia,2022,0.8398017271,16,2,-3,0.8744069767,9,0,0,0.8525564038,7,-2,0,0.7254951743,27,-3,-3
Asia and the Pacific,Taiwan,2022,0.8318713581,17,3,2,0.7960429298,22,-1,4,0.7811122104,15,6,14,0.8968616454,4,3,8
Europe,Greece,2022,0.8315820827,17,1,7,0.7571396904,26,-2,-3,0.6156467711,41,-3,-2,0.6992602571,33,1,-6
Europe,United Kingdom,2022,0.8236545248,19,-3,4,0.7275726994,34,-2,-6,0.7810934992,15,3,-9,0.729315043,25,-2,-9
Europe,Czechia,2022,0.8231381726,20,1,13,0.8678070371,10,1,12,0.7265741643,23,11,9,0.6612797959,48,1,-3
Europe,Switzerland,2022,0.8228223304,20,2,2,0.9376869762,3,0,1,0.8902169729,4,0,6,0.8770164858,6,-1,-2
Europe,Portugal,2022,0.8203991284,22,-13,-19,0.7360751944,31,0,0,0.6567423804,34,-1,-12,0.5996168201,69,7,-12
Europe,Lithuania,2022,0.8188192872,23,0,-3,0.8027023456,20,5,1,0.6859094942,31,-1,3,0.633256947,57,-1,5
Americas,Canada,2022,0.8172829168,24,0,5,0.7806577229,23,0,-3,0.781453537,15,0,-2,0.7540265765,17,4,0
Europe,Ireland,2022,0.8137745732,25,0,1,0.8530450365,12,0,-2,0.8402378823,11,-1,4,0.9370874061,3,0,4
Europe,Slovakia,2022,0.8098065835,26,1,2,0.7293849846,33,-6,1,0.675512913,32,-1,6,0.6634202275,47,-10,11
Europe,Slovenia,2022,0.8094545354,27,8,-11,0.7689673783,24,12,-10,0.688987678,30,11,-6,0.6920702155,34,14,-8
Europe,Luxembourg,2022,0.8091389647,27,-1,-3,0.9065103684,6,-2,0,0.8506124541,8,1,1,0.7737767919,14,-1,-6
Asia and the Pacific,Japan,2022,0.8067297481,29,-1,-12,0.8293916417,16,1,2,0.770248985,18,-2,3,0.6561684506,52,0,4
Europe,Croatia,2022,0.7960849319,30,0,8,0.678210163,40,0,1,0.6014666382,43,1,2,0.5980588283,71,8,-7
Asia and the Pacific,South Korea,2022,0.7783291404,31,-2,-4,0.7231788982,35,-3,-3,0.7136757829,28,-6,-1,0.6706682676,45,0,-7
Americas,Jamaica,2022,0.7719422752,32,0,5,0.7107001926,36,1,9,0.615362647,42,-2,7,0.6272317574,60,10,-10
Europe,Austria,2022,0.7716364073,32,-1,0,0.7692411801,24,-3,-8,0.6478575459,36,-8,-13,0.7563696033,16,4,-6
Europe,Cyprus,2022,0.7636230261,34,-1,2,0.7388552061,30,-2,-6,0.6684008705,33,-1,-5,0.6871705029,35,3,-7
Africa,Cabo Verde,2022,0.7624630896,35,-1,-4,0.5751086796,61,1,-12,0.567929542,50,-1,-3,0.496232762,109,-2,-2
Americas,Panama,2022,0.7478045574,36,0,3,0.5790632482,59,6,6,0.5232838501,66,0,-7,0.5871638821,74,0,-4
Europe,Iceland,2022,0.7465713992,37,0,-2,0.8615504237,11,-1,1,0.7494644245,21,-4,-4,0.8365983307,7,2,null
Western Asia,Israel,2022,0.7452708842,38,1,5,0.7087589904,37,-7,-1,0.7243658111,25,4,8,0.6768865012,38,-3,4
Europe,Romania,2022,0.742812648,39,3,6,0.6121088394,51,-9,-1,0.5569926969,51,1,19,0.4812489583,115,-20,-1
Americas,Trinidad and Tobago,2022,0.7399919332,40,1,1,0.6580345075,41,0,-2,0.6212874106,40,8,0,0.7365961544,22,-4,-1
Americas,Argentina,2022,0.7374704432,41,-3,5,0.6201521042,47,1,6,0.5546291709,53,-2,4,0.7529268036,18,4,6
Americas,Peru,2022,0.7236536869,42,-2,-2,0.5126814831,81,-2,-2,0.4845860335,83,-10,-20,0.5932450674,72,-6,-12
Europe,Malta,2022,0.7202349258,43,0,1,0.741334544,29,5,6,0.6291928526,39,0,4,0.6285534825,58,-11,-15
Europe,Latvia,2022,0.7044140484,44,13,16,0.8056132136,19,0,11,0.7848111974,14,5,16,0.7015469254,31,8,24
Americas,Brazil,2022,0.7026143404,45,0,-3,0.5035538261,84,-11,-18,0.4737274771,93,-4,-25,0.6792875371,37,3,10
Europe,Bulgaria,2022,0.697291603,46,5,3,0.6482258005,42,2,6,0.5785976771,48,7,10,0.5617718178,82,-18,-5
Americas,Barbados,2022,0.6903083278,47,-3,1,0.6998757611,39,-1,-1,0.6463657213,37,-1,0,0.676047267,39,-3,1
Africa,Ghana,2022,0.683573105,48,-2,-2,0.5697334152,64,-2,-18,0.4755288563,91,-3,-19,0.7163631823,29,3,-9
Americas,Suriname,2022,0.6787240283,49,-2,2,0.5928422917,57,-13,1,0.5162043612,70,9,15,0.6602828129,49,1,-1
Americas,United States,2022,0.6740724389,50,-1,4,0.7451122741,28,1,5,0.7039909585,29,-2,2,0.776277535,12,-2,-1
Europe,Moldova,2022,0.6701991768,51,-2,32,0.6063358094,53,0,17,0.5439997775,56,15,38,0.5278618258,99,9,14
Asia and the Pacific,Vanuatu,2022,0.6696315316,51,-3,2,0.6437196709,43,14,16,0.5928264487,45,-3,5,0.6502201935,53,4,13
Americas,Ecuador,2022,0.659472694,53,-1,26,0.5234643603,76,-1,10,0.4858002004,82,-5,1,0.6149682511,63,9,26
Asia and the Pacific,Timor-Leste,2022,0.6503979454,54,-1,3,0.476201683,95,1,18,0.5202635571,67,1,16,0.5528504497,87,14,10
Africa,South Africa,2022,0.6501512064,54,0,-2,0.6208986472,46,2,5,0.535269687,59,0,14,0.6743572392,42,2,-6
Americas,Colombia,2022,0.6359826225,56,7,10,0.4879555586,91,7,1,0.4977091064,73,20,-7,0.5567684505,85,17,-9
Africa,Malawi,2022,0.6339865841,57,-2,19,0.5363988917,73,3,2,0.5506179628,54,-4,25,0.6285151923,58,-26,5
Europe,Poland,2022,0.632318442,58,-3,-24,0.598926511,54,4,-14,0.5296900141,61,0,-9,0.544813957,92,-9,-11
Africa,Lesotho,2022,0.6285584202,59,8,13,0.5444539771,70,1,7,0.490722435,80,-2,7,0.5713364426,79,-11,-5
Asia and the Pacific,Indonesia,2022,0.6259960977,60,-1,-3,0.4780581271,94,6,-11,0.4575290012,97,-2,-21,0.736831623,22,4,9
Asia and the Pacific,Nepal,2022,0.623696733,61,8,10,0.5414584909,71,3,-2,0.4729493476,94,-2,-19,0.5999906788,69,4,2
Asia and the Pacific,Bhutan,2022,0.6220368788,62,-2,0,0.5726748525,63,-12,4,0.6383853001,38,-1,-3,0.4598208651,122,-5,-2
Asia and the Pacific,Mongolia,2022,0.615766044,63,-5,-4,0.5552873614,67,-1,-5,0.5188339076,68,-12,-4,0.5214389503,103,-4,-23
Africa,Namibia,2022,0.6144932709,64,-3,0,0.5735189006,62,-1,-2,0.5822559275,47,0,-6,0.5803390504,76,2,-23
Americas,Dominican Republic,2022,0.6121608323,65,-1,23,0.5037287774,84,2,14,0.4820517644,86,0,29,0.7015469254,31,11,44
Asia and the Pacific,India,2022,0.6007150906,66,-4,-16,0.4386063256,104,-3,-11,0.4965901245,74,2,-12,0.5608268253,83,0,-12
Africa,Senegal,2022,0.5957799632,67,6,8,0.5816654313,58,2,-3,0.5513752367,54,-1,-1,0.7471626897,21,7,23
Europe,Albania,2022,0.5953435574,68,3,-1,0.6193292169,48,-2,6,0.4953734254,77,8,-4,0.5609364844,83,9,13
Asia and the Pacific,Sri Lanka,2022,0.5927724771,69,7,11,0.5013586722,88,-18,-2,0.4723522495,95,6,-29,0.5724371213,78,12,-37
Americas,Mexico,2022,0.5927766794,69,-2,4,0.4127341114,114,-7,-2,0.4068501131,107,0,-10,0.4317491076,132,-5,-16
Europe,North Macedonia,2022,0.5928891624,69,1,20,0.538712917,72,-4,-4,0.4753102299,92,4,-12,0.552612399,87,-11,-16
Africa,Mauritius,2022,0.5908511396,72,-7,-43,0.5678268899,66,-2,-22,0.4812330332,88,-18,-37,0.7500946572,19,10,3
Europe,Kosovo,2022,0.5904864943,73,4,8,0.5021553765,87,1,10,0.5311204588,60,5,11,0.5310172808,98,16,17
Americas,Paraguay,2022,0.5878827738,74,-2,-5,0.4745408288,96,1,13,0.4392771154,102,-2,3,0.4510886674,123,4,4
Africa,Liberia,2022,0.5778850788,75,0,2,0.502999882,86,2,-5,0.418299856,105,2,-3,0.6025975509,67,-3,-3
Americas,Bolivia,2022,0.5757587998,76,5,2,0.4718337765,97,2,1,0.4647230712,96,-5,-4,0.6583075519,51,0,-18
Africa,The Gambia,2022,0.5719330102,77,5,22,0.5768386229,60,7,14,0.5272873679,63,4,6,0.6379463363,56,4,52
Asia and the Pacific,Solomon Islands,2022,0.5714381423,78,-5,6,0.5199669105,78,2,22,0.4829650547,84,5,2,0.4812774059,115,2,-23
Europe,Armenia,2022,0.5694931041,79,-1,43,0.6068748858,52,7,38,0.4966627296,74,-5,33,0.5806778283,75,6,26
Africa,Zambia,2022,0.569317448,79,4,31,0.4368896536,106,9,0,0.4933439667,78,21,12,0.6672131287,46,40,36
Africa,Botswana,2022,0.5635880556,81,-3,-20,0.5701912911,64,-12,-8,0.5927494433,45,1,-4,0.6498686339,53,-22,6
Africa,Sierra Leone,2022,0.5598642598,82,-4,0,0.5267181175,74,3,34,0.4788783336,89,-5,11,0.748645988,20,-5,15
Asia and the Pacific,Maldives,2022,0.5504424949,83,3,30,0.4713419975,98,-5,37,0.5363335755,58,1,64,0.5419683847,93,1,31
Europe,Montenegro,2022,0.5501885247,83,1,13,0.5975547192,55,1,2,0.5707262989,49,-5,-1,0.6025018734,67,-12,-21
Europe,Hungary,2022,0.5478270482,85,0,-18,0.6307556159,44,-1,-2,0.5263538997,64,-6,-18,0.443219515,125,4,-8
Europe,Georgia,2022,0.5447909871,86,1,-16,0.6158624257,49,4,12,0.527878108,62,1,-7,0.5413385779,94,2,5
Americas,Guyana,2022,0.5353417475,87,1,-24,0.5542372057,68,0,-4,0.4832608538,84,-9,-19,0.5549707931,86,5,-3
Africa,Tunisia,2022,0.5308061264,88,-23,-33,0.6132849219,50,0,1,0.486529686,81,-27,-25,0.539682128,95,-35,-58
Asia and the Pacific,Philippines,2022,0.5296202652,89,0,-3,0.4964039513,90,1,-14,0.4204335537,104,-1,-1,0.6072860858,66,1,-5
Africa,Kenya,2022,0.5303659092,89,11,8,0.5014315427,88,4,14,0.5014135829,72,1,19,0.676047267,39,24,12
Americas,Honduras,2022,0.5277596919,91,5,23,0.4410514044,103,12,20,0.4437975758,101,14,23,0.5320787822,97,7,6
Asia and the Pacific,Malaysia,2022,0.5266930338,92,17,29,0.5186128827,80,1,29,0.5039792802,71,8,18,0.5190078584,104,-4,-5
Europe,Ukraine,2022,0.5191760149,93,-2,5,0.520295155,78,0,0,0.3966508948,112,5,19,0.5902727505,73,13,36
Africa,Niger,2022,0.5183411823,94,-1,1,0.4878769643,91,-1,-18,0.4569972268,98,-11,-10,0.6187465585,62,-4,-28
Americas,El Salvador,2022,0.5157339455,95,-6,-30,0.3405877035,137,-11,-22,0.3269610478,137,-2,-36,0.4421015581,126,-5,-38
Americas,Guatemala,2022,0.5140590404,96,-4,-23,0.3637260813,132,-1,-5,0.3385122728,131,-10,-15,0.4385627205,127,-4,-23
Europe,Bosnia and Herzegovina,2022,0.5012529213,97,2,-5,0.5264974909,75,7,-3,0.4776335642,90,4,-12,0.5122921166,106,2,-15
Africa,Madagascar,2022,0.4986782027,98,-1,5,0.3963126711,121,0,-4,0.37744788,119,-3,15,0.4786554819,117,2,-13
Africa,Nigeria,2022,0.4961050283,99,-2,-15,0.4166989175,112,0,-18,0.3565073336,126,-1,-2,0.547400188,90,-10,-23
Asia and the Pacific,Fiji,2022,0.4900066973,100,4,1,0.481259871,93,1,-8,0.4545287425,99,-2,-1,0.6594876925,50,4,36
Asia and the Pacific,Singapore,2022,0.4871811337,101,0,4,0.6245816694,45,1,2,0.809795814,12,0,1,0.4876826587,112,3,7
Western Asia,Kuwait,2022,0.4770854684,102,6,4,0.4694124099,99,-4,-5,0.5240148272,65,14,15,0.4947549524,110,10,2
Asia and the Pacific,Papua New Guinea,2022,0.4749921183,103,3,1,0.4516248891,101,2,17,0.4017351173,110,-5,-1,0.4870169321,113,3,25
Africa,Benin,2022,0.4742400434,104,-1,-48,0.5499780235,69,3,-26,0.5188059825,68,-5,-15,0.6197092094,61,-2,-43
Europe,Serbia,2022,0.4716310344,105,1,-18,0.5937357341,56,-1,7,0.5380907752,57,5,3,0.5398685083,95,1,-17
Western Asia,Iraq,2022,0.4692542154,106,-4,-4,0.2998183174,145,1,8,0.2909157671,143,1,7,0.4068243822,137,2,-1
Africa,Côte d’Ivoire,2022,0.4661640293,107,-2,-16,0.4309908311,109,2,-4,0.4056184219,109,1,-15,0.5725266635,77,11,8
Africa,Togo,2022,0.4639432787,108,1,1,0.3720215753,127,0,-6,0.452623674,100,-2,19,0.6143807854,64,-2,23
Western Asia,Lebanon,2022,0.455127961,109,3,5,0.4370955607,106,-1,-2,0.3261425055,138,1,-12,0.6103609031,65,5,4
Asia and the Pacific,Pakistan,2022,0.4476393928,110,1,1,0.3483019102,136,-1,9,0.3723398588,121,7,9,0.566033373,81,-6,2
Africa,Tanzania,2022,0.4443922775,111,2,-17,0.5232744695,76,8,12,0.556603982,51,5,10,0.5505330685,89,-6,9
Europe,Türkiye,2022,0.440284848,112,2,0,0.3676058381,129,0,-1,0.2609232223,148,1,3,0.3861420311,139,-1,-5
Africa,Guinea-Bissau,2022,0.4331349272,113,-18,-13,0.3665421693,130,-3,3,0.3112201797,141,-3,-5,0.5669071973,80,-11,15
Western Asia,Jordan,2022,0.430992556,114,2,9,0.4557034938,100,-13,-12,0.4916834549,79,3,13,0.4694325459,119,-16,-9
Africa,Morocco,2022,0.4304534869,115,0,4,0.5105535051,82,2,-1,0.4156126276,106,0,4,0.4971028006,108,2,3
Africa,Mauritania,2022,0.4057148534,116,1,20,0.2882319861,149,-6,-3,0.3249925534,139,-5,3,0.4651990103,120,-15,2
Africa,Mozambique,2022,0.3925238845,117,2,0,0.4241640129,111,2,-2,0.4074229067,107,7,7,0.41976709,135,-4,-9
Africa,Zimbabwe,2022,0.3897919396,118,1,10,0.4388901536,104,-1,-8,0.2806442396,145,-2,2,0.5225318868,102,-13,-10
Asia and the Pacific,Kyrgyzstan,2022,0.3889462098,119,-1,-1,0.3897003839,122,-5,-21,0.3798811663,117,-5,-21,0.413010011,136,-3,-13
Africa,Uganda,2022,0.3806123749,120,1,4,0.3842586349,124,-1,-8,0.3750130536,120,-1,-10,0.5162009942,105,-7,-26
Africa,Rwanda,2022,0.370280078,121,1,12,0.3991842518,118,-1,4,0.398701615,111,-8,-13,0.3285490599,150,1,-5
Africa,Algeria,2022,0.3690307574,122,0,9,0.412450465,115,-5,-12,0.3797734166,117,4,4,0.4457597471,124,0,-3
Africa,Angola,2022,0.3693322051,122,3,12,0.4091488902,116,3,15,0.3720004597,121,5,18,0.4361492876,131,10,20
Africa,Ethiopia,2022,0.3654308283,124,0,30,0.4258059432,110,-8,23,0.3586380147,123,1,12,0.5245273738,101,10,34
Asia and the Pacific,Bangladesh,2022,0.3589278173,125,1,0,0.3493808672,134,4,5,0.3325984785,135,7,8,0.4869705543,113,0,-11
Africa,Comoros,2022,0.3525167071,126,3,-33,0.3293069953,140,-3,-21,0.3295710614,136,1,-18,0.5094924575,107,-1,-18
Western Asia,Oman,2022,0.3531440235,126,1,1,0.4005108693,117,3,3,0.495783576,76,6,1,0.2934947386,155,4,1
Africa,Central African Republic,2022,0.3485479154,128,0,-2,0.2868908935,151,-2,3,0.2213785198,155,1,-6,0.3914263636,138,2,-6
Asia and the Pacific,Kazakhstan,2022,0.3423573041,129,2,17,0.4416587257,102,4,5,0.3930124433,115,3,17,0.3510009898,146,3,8
Africa,Gabon,2022,0.3405617568,130,0,8,0.5098330243,83,0,-3,0.4357624827,103,-1,3,0.6498328082,53,0,-30
Asia and the Pacific,Thailand,2022,0.3406066591,130,5,34,0.3989029711,118,4,18,0.3348214031,133,3,13,0.4702943563,118,3,13
Africa,Cameroon,2022,0.3354983666,132,2,7,0.3355813718,138,1,3,0.249970315,152,1,0,0.525625983,100,12,4
Africa,Democratic Republic of the Congo,2022,0.3332350161,133,0,11,0.2710824732,156,4,3,0.2479519169,153,-8,12,0.491814212,111,-19,-17
Africa,Djibouti,2022,0.319208827,134,2,11,0.3685422133,128,6,9,0.3583547219,124,4,4,0.3780143681,141,1,1
Africa,Egypt,2022,0.3173170117,135,2,8,0.3236607252,141,0,3,0.266683845,147,0,5,0.2934947386,155,-2,1
Europe,Russia,2022,0.3132456649,136,-4,5,0.3528176755,133,-9,-9,0.3349079804,133,-6,0,0.3274326337,151,-3,-5
Asia and the Pacific,Vietnam,2022,0.3072853507,137,3,10,0.3739655443,126,5,5,0.3888441303,116,-6,-4,0.4278963926,133,-7,-4
Western Asia,Iran,2022,0.3064919057,138,1,-1,0.2803053802,155,-3,-6,0.3580032681,124,-1,-7,0.3314474999,149,1,-2
Africa,Eswatini,2022,0.2992811906,139,-1,12,0.3337995892,139,1,1,0.2571893243,149,-3,-9,0.4375619545,129,3,10
Africa,Congo,2022,0.2970047753,140,4,9,0.2617370813,158,-4,0,0.2562632944,150,1,10,0.4379265005,129,5,15
Asia and the Pacific,Uzbekistan,2022,0.2970868598,140,0,16,0.3658556759,131,0,16,0.3944764567,114,-1,27,0.343859317,148,6,13
Africa,Burundi,2022,0.2949509157,142,0,11,0.285412782,152,4,11,0.2706724902,146,5,20,0.3448970073,147,-4,-11
Asia and the Pacific,Cambodia,2022,0.2879474014,143,0,-8,0.2703175141,157,1,-5,0.2180314324,156,2,2,0.265810151,158,-1,-10
Western Asia,Bahrain,2022,0.2826052579,144,1,5,0.2881577217,149,2,13,0.3198566385,140,0,8,0.3620326567,143,1,6
Americas,Nicaragua,2022,0.2788098092,145,1,-5,0.2023474417,164,-1,-40,0.1649506669,165,1,-21,0.3244978798,152,0,-22
Asia and the Pacific,Laos,2022,0.2594370142,146,2,14,0.2992402345,146,9,13,0.3530687666,128,4,17,0.2582978763,159,3,6
Americas,Venezuela,2022,0.2574742066,147,0,-5,0.3214939924,142,-1,0,0.105871051,173,0,-4,0.3528647177,145,0,-4
Europe,Azerbaijan,2022,0.2548095176,148,0,7,0.3041348092,143,1,5,0.2894941246,144,6,13,0.1918979103,166,3,2
Americas,Cuba,2022,0.2494872822,149,1,10,0.3015407084,144,3,-2,0.2534105168,151,3,3,0.2121100775,165,0,-1
Asia and the Pacific,Tajikistan,2022,0.2475796534,150,1,7,0.1897565612,165,2,1,0.1885232267,160,4,1,0.1848450889,167,0,-1
Africa,Equatorial Guinea,2022,0.2448684915,151,1,7,0.2209470318,162,0,3,0.1733785424,163,-2,0,0.2363401023,163,1,-1
Europe,Belarus,2022,0.2405763073,152,1,0,0.296045062,148,-3,-57,0.2091827457,158,2,-35,0.2518458459,161,-1,-8
Western Asia,Syria,2022,0.2261129831,153,2,9,0.131663476,172,-3,-1,0.1131722309,171,-7,1,0.1657269939,170,0,0
Asia and the Pacific,Turkmenistan,2022,0.2169579924,154,0,7,0.1552327568,169,0,0,0.1632052012,166,2,-4,0.06888232582,171,0,-2
Asia and the Pacific,North Korea,2022,0.1953909878,155,1,8,0.1578409163,168,3,2,0.1741202491,162,0,1,0.03212557183,172,0,-1
Western Asia,Qatar,2022,0.1239572616,156,1,8,0.3746958906,125,5,-1,0.3974916936,112,-3,-8,0.2339716439,164,2,3
Africa,Burkina Faso,2022,0,157,-64,-67,0.4147207899,113,1,-29,0.4820039328,86,-14,-4,0.6730892942,43,-28,-15
Africa,Chad,2022,0,157,1,-9,0.2177384429,163,-3,-2,0.1517388682,168,1,-1,0.3693340841,142,-7,-10
Western Asia,Yemen,2022,0,157,1,7,0.1425141839,171,1,1,0.127223011,170,2,0,0.2527256643,160,3,-1
Africa,Eritrea,2022,0,157,1,7,0.1528090354,170,3,3,0.1657296952,164,3,9,0.01872974868,173,0,-1
Western Asia,United Arab Emirates,2022,0,157,1,7,0.3899680503,122,2,8,0.6007019111,43,-1,1,0.3137398545,153,2,5
Africa,Guinea,2022,0,157,1,-37,0.297916604,147,3,3,0.3053888445,142,-1,-5,0.5466085418,90,-9,-23
Western Asia,Saudi Arabia,2022,0,157,1,7,0.2810344548,154,3,3,0.3517317952,129,2,-2,0.1815524189,168,0,-5
Africa,Libya,2022,0,157,1,-27,0.2548164148,159,0,-3,0.1519425413,168,2,0,0.4387223468,127,10,16
Africa,Mali,2022,0,157,1,-49,0.3969923351,120,-11,-6,0.3370980784,132,1,-3,0.7129088703,30,10,-11
Asia and the Pacific,China,2022,0,157,1,7,0.3490307308,134,2,3,0.3464031493,130,0,-10,0.2964505774,154,4,1
Americas,Haiti,2022,0,157,1,-43,0.2502755918,160,-12,-10,0.2093969425,158,-1,-3,0.3833152219,140,-4,-13
Asia and the Pacific,Myanmar,2022,0,157,1,-50,0.2370343736,161,2,-33,0.2153421721,157,2,-45,0.2861612116,157,-12,-39
Western Asia,Palestine,2022,0,157,1,7,0.4324179164,108,0,-37,0.3564115798,127,-7,-19,0.4282944332,133,-8,-8
Africa,Somalia,2022,0,157,1,7,0.1883103075,166,0,1,0.1839625637,161,2,-2,0.3552438325,144,3,8
Africa,South Sudan,2022,0,157,1,7,0.18528995,167,-2,1,0.1546230594,167,4,4,0.2509838792,162,-1,-2
Africa,Sudan,2022,0,157,1,-29,0.282225285,153,0,11,0.2471865163,154,-6,2,0.4607645718,121,9,28
Asia and the Pacific,Afghanistan,2022,0,157,1,-25,0.1218694824,173,-5,-18,0.111211917,172,-17,-34,0.1720301176,169,-13,-29`
