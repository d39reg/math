function math(txt)
{
  var code = txt+'$';
  var i = 0;
  var len = txt.length;
  if(!len) return 0;

  function parseInteger()
  {
    var s = txt.charAt(i++);
    var flt = '';
    while(s == ' ') s = txt.charAt(i++); // delete white symbol
    if (s >= '0' && s <= '9')
    {
      while(((s >= '0' && s <= '9') || s == '.') && i <= len)
      {
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
    while(s == ' ') s = txt.charAt(i++); // delete white symbol
    if(s == '+')
    {
      return flt + getToken(parseInteger());
    }
    else if(s == '-')
    {
      return flt - getToken(parseInteger());
    }
    else if(s == '*')
    {
      return flt * getToken(parseInteger());
    }
    else if(s == ':')
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
    else if(s !='') alert('Error symbol `'+s+'`!');
    return flt;
  }

  return getToken(parseInteger());

}
//alert(math('2*(4+3)*(1+2):2'));
