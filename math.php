<?php
	class math
	{
		private $i = 0;
		private $txt = '';
		private $len = 0;
		private function parseInteger() // function convertion from text to numbers
		{
			$s = $this->txt[$this->i++];
			$flt = '';
			while($s == ' ') $s = $this->txt[$this->i++]; // delete white symbol
			if (($s >= '0' && $s <= '9') || $s == '-')
			{
				$point = false;
				$flt .= $s;
				$s = $this->txt[$this->i++];
				while((($s >= '0' && $s <= '9') || $s == ',') && $this->i <= $this->len)
				{
					if($s == ',') 
					{
						if($point) {echo('Error integer!');exit;}
						else $s = '.';
					}
					$flt .= $s;
					$s = $this->txt[$this->i++];
				}
				$flt = (float)$flt;
			}
			return $flt;
		}

		private function getToken($flt)
		{
			$s = $this->txt[$this->i-1];
			while($s == ' ') $s = $this->txt[$this->i++]; // delete white symbols
			
			if($s == '+') // the symbol `+` allows to sum numbers
			{
				return $flt + $this->getToken($this->parseInteger());
			}
			elseif($s == '-') // the symbol `-` allows to subtract numbers
			{
				return $flt - $this->getToken($this->parseInteger());
			}
			elseif($s == '*') // the symbol `*` allows to multiply numbers
			{
				return $flt * $this->getToken($this->parseInteger());
			}
			elseif($s == ':') // the symbol `:` allows to devide numbers
			{
				return $flt / $this->getToken($this->parseInteger());
			}
			elseif($s == '(')
			{
				return $this->getToken($this->getToken($this->parseInteger()));
			}
			elseif($s == ')')
			{
				$this->i++;
			}
			//elseif($s !='') {echo('Error symbol `'+$s+'`!');exit;} // error math code
			
			return $flt;
		}
		public function parse($txt)
		{
			$this->txt = $txt.'$';
			$this->i = 0;
			$this->len = strlen($txt);
			if(!$this->len) return 0;

			return $this->getToken($this->parseInteger());

		}
	}
	//$m = new math();
	//echo($m->parse('2*(4+3)*(1+2):2,4'));
  ?>
