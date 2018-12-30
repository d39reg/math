function math(txt)
{
  var code = txt+'$';
  var i = 0;
  var len = txt.length;
  if(!len) return 0;

  function parseInteger() // function convertion from text to numbers
  {
    var s = txt.charAt(i++);
    var flt = '';
    while(s == ' ') s = txt.charAt(i++); // delete white symbol
    if (s >= '0' && s <= '9')
    {
      var point = false;
      while(((s >= '0' && s <= '9') || s == ',') && i <= len)
      {
        if(s == ',') 
        {
          if(point) alert('Error integer!');
          else s = '.';
        }
        flt += s;
        s = txt.charAt(i++);
      }
      flt = parseFloat(flt);
    }
    return flt;
  }

  function getToken(flt)
  {
    var s = txt.charAt(i-1);
    while(s == ' ') s = txt.charAt(i++); // delete white symbols
    if(s == '+') // the symbol `+` allows to sum numbers
    {
      return flt + getToken(parseInteger());
    }
    else if(s == '-') // the symbol `-` allows to subtract numbers
    {
      return flt - getToken(parseInteger());
    }
    else if(s == '*') // the symbol `*` allows to multiply numbers
    {
      return flt * getToken(parseInteger());
    }
    else if(s == ':') // the symbol `:` allows to devide numbers
    {
      return flt / getToken(parseInteger());
    }
    else if(s == '(')
    {
      return getToken(getToken(parseInteger()));
    }
    else if(s == ')')
    {
      i++;
    }
    else if(s !='') alert('Error symbol `'+s+'`!'); // error math code
    return flt;
  }

  return getToken(parseInteger());

}
//alert(math('2*(4+3)*(1+2):2,4'));
