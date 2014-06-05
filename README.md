#theironline
===========

##Subway Exploration Horror Game

###Creatures


 - name
   - Required, String
   - The name of the creature
 - size
   - Required, String (Size)
 - plural
   - Optional, String
   - The name of more than one of the creature
   - Defaults to the creature's name + "s"
 - hp
   - Required, String (Dice)
 - spawn
   - Optional, String (Freq)
   - Defaults to "none"
 - biogenesis
   - Optional, String (Freq)
   - If the creature should spontaneously spawn from a location containing the prerequisite materials
   - Defaults to "none"
 - materials
   - Required, Array of Strings
   - An array containing the string keys of the materials that the item is created from
 - senses
   - Required, Object
   - The descriptive text for the creature
   - Needs to have a key of each of the sense strings
   - Values are strings
 - trail 
   - Optional, Trail Object
      - to be defined 
 - source
    - Optional, Source Object
	    - title,
	    - entry,
      - url
 - variants
   - Optional, Array of Creature Objects
   - Values set in the creature objects will override values in the base class
   - Define the smallest (weakest) creature as the base class

###Types

 - Sense String (Sense)
   - One of "sight", "smell", "sound", "taste", "touch"
 - Frequency String (Freq)
   - One of "very common", "common", "average", "rare", "very rare", "unique", "none"
 - Dice String (Dice)
   - The hit die of the creature in standard dice format
   - Examples: "1d8", "2d6+4", "5d4+2d3+4"
 - Size String (Size)
   - One of "fine", "diminutive", "tiny", "small", "medium", "large", "huge", "gargantuan", "colossal"
   - See [[http://www.dandwiki.com/wiki/SRD:Movement,_Position,_and_Distance]]
